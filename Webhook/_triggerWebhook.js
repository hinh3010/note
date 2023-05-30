const { getStore } = require('@pf126/mongos-connector')
const { getLogger } = require('@pf126/parrot')

exports.triggerWebhook = context => {
    const { getModel } = getStore(context)
    const logger = getLogger(context)
    const LOG_PREFIX = `[TRIGGER_${TAG}]`

    const getWebhookSecretKey = _getWebhookSecretKey(context)
    const WebhookNotification = getModel('WebhookNotification')
    const settingContainer = getStoreSettingContainer(context)
    const maxRetryDay = settingContainer.getSetting('webhook_max_retry_day') || 3
    const maxRetryPerDay = settingContainer.getSetting('webhook_max_retry_per_day') || 5

    return async ({ webhookId, isManual = false }) => {
        logger.info(`${LOG_PREFIX} Handle trigger webhook ${JSON.stringify({ webhookId, isManual })}`)
        const webhook = await WebhookNotification.findById(webhookId).lean()
        if (!webhook) {
            throw new Error(`Webhook with id ${webhookId} not found`)
        }

        const { _id, event, status, endpoint, headers, payload, created_at, retry_count, retry_day } = webhook
        if (FINISHED_STATUSES.includes(status)) {
            throw new Error(`Forbid trigger webhook ${_id} with status ${status}, with event ${event}`)
        }

        const webhookSecretKey = await getWebhookSecretKey()
        const vPayload = Object.assign({}, payload, {
            event_id: _id,
            event_time: created_at
        })
        const config = {
            method: 'POST',
            url: endpoint,
            data: vPayload,
            headers: Object.assign({}, headers, {
                'merchize-webhook-key': webhookSecretKey
            })
        }

        logger.info(`${LOG_PREFIX} Webhook=${_id} | Request=${JSON.stringify(config)}`)

        const update = { $set: { status: 'failed' } }
        try {
            const { status: statusCode, data: response, statusText } = await axios(config)
            logger.info(`${LOG_PREFIX} Webhook=${_id} | Status code ${statusCode} | Status text ${statusText} | Response=`, response)
            if (statusCode === 200) {
                return WebhookNotification.updateOne({ _id }, { $set: { status: 'done' } })
            } else {
                update['$set']['error_message'] = `${statusCode}_${statusText}`
            }
        } catch (error) {
            let jsonError = error
            if (axios.isAxiosError(error)) {
                jsonError = error.toJSON()
            }

            update['$set']['error_message'] = `${error.message}`

            logger.error(`${LOG_PREFIX}[ERROR] Data=${JSON.stringify({ _id, endpoint, payload })} |`, jsonError)
        }

        const nextRetryCount = retry_count + 1
        const nextRetryDay = !retry_day ? retry_day + 1 : retry_day

        if (!isManual) {
            if (retry_day > maxRetryDay) {
                update['$set'] = Object.assign({}, update['$set'], {
                    status: 'cancelled',
                    error_message: 'Max retry count reached',
                    next_retry_time: null
                })
            } else {
                // compute next retry time
                const { nextRetryTime, retryDay, retryCount } = _calculateNextRetryTime(nextRetryCount, maxRetryPerDay, nextRetryDay)
                update['$set'] = Object.assign({}, update['$set'], {
                    next_retry_time: nextRetryTime,
                    retry_day: retryDay,
                    retry_count: retryCount
                })
            }
        }

        return WebhookNotification.updateOne({ _id }, update)
    }
}