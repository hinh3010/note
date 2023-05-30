import Bluebird from 'bluebird'
import update from 'immutability-helper'
import _ from 'lodash'
import {generatePersonalizedArtworkv3} from '../../../services/api/MockupGeneratorServices'
import {deleteProducts} from '../../../services/api/ProductBulkServices'
import {createProductLines, createProductPODV3, deleteProduct} from '../../../services/api/ProductServices'
import {searchVariants} from '../../../services/api/VariantServices'
import composite from '../webworkers/helpers/composite'

const handleError = (setCampaigns, campaignIndex, message, productID) => {
    try {
        setCampaigns((prevCampaigns) => {
            return update(prevCampaigns, {
                [campaignIndex]: {
                    status: {$set: 'Error'},
                    error: {$set: message},
                },
            })
        })

        if (Array.isArray(productID) && productID.length > 0) deleteProducts(productID, {})
        else if (productID !== '') deleteProduct(productID)
    } catch (e) {
        console.error(e)
    }
}

const uploadArtworkProductLine = async (params) => {
    const {index, product_type, productIDs, personalizedArtworkPayload, setCampaigns, campaignIndex} = params

    const productId = productIDs[index]

    try {
        let payload = appendFormData(personalizedArtworkPayload, ['product_id', productId])
        payload = appendFormData(payload, ['product_type', product_type])
        const {success, message} = await generatePersonalizedArtworkv3(payload)

        if (!success) throw new Error(message)

        setCampaigns((prevCampaigns) => {
            return update(prevCampaigns, {
                [campaignIndex]: {
                    productLines: {
                        [index]: {
                            $merge: {
                                status: success ? 'Completed' : 'Error',
                                error: message || '',
                            },
                        },
                    },
                },
            })
        })

        return {
            success: true,
            data: {productId},
        }
    } catch (e) {
        setCampaigns((prevCampaigns) => {
            return update(prevCampaigns, {
                [campaignIndex]: {
                    productLines: {
                        [index]: {
                            $merge: {
                                status: 'Error',
                                error: e.message,
                            },
                        },
                    },
                },
            })
        })

        return {
            success: false,
            data: {productId},
            message: e.message,
        }
    }
}

export const createCampaignCombine = async (params) => {
    const {
        campaign,
        campaignIndex,
        setCampaigns,
        storeSettings,
        campaignDetails,
        productLines,
        personalizedArtworkPayload,
    } = params

    let productIDCreated = ''

    try {
        const storeMode = storeSettings.getStoreMode()

        setCampaigns((prevCampaigns) => {
            return update(prevCampaigns, {
                [campaignIndex]: {
                    status: {$set: 'Uploading'},
                },
            })
        })

        const payload1 = {
            ...campaignDetails,
            collections: !Array.isArray(campaignDetails.collections)
                ? []
                : campaignDetails.collections.map((collection) => collection.value),
            title: campaign.title,
            description: campaignDetails.description,
            productLines: productLines.map((product) => {
                const {attributes, variants} = product
                return {
                    ...product,
                    variants: variants
                        .filter((variant) => variant.is_selected)
                        .map(({input_price, ...rest}) => ({...rest, retail_price: input_price})),
                    attributes: attributes.map((attribute) => {
                        const selectedValues = attribute.values.filter((item) => item.is_selected)
                        const filteredValues = _.sortBy(selectedValues, ['position'])

                        return {
                            ...attribute,
                            values: filteredValues,
                        }
                    }),
                }
            }),
        }

        const res1 = await createProductLines(payload1)

        if (!res1.success) throw new Error(res1.message)

        const productID = res1.data._id
        productIDCreated = res1.data._id

        if (storeMode === 'normal') {
            setCampaigns((prevCampaigns) => {
                return update(prevCampaigns, {
                    [campaignIndex]: {
                        url: {$set: res1.data.url},
                    },
                })
            })
        }
        console.log(
            '🚀 ~ file: logic.js:154 ~ createCampaignCombine ~ personalizedArtworkPayload:',
            personalizedArtworkPayload
        )

        await Bluebird.map(
            Object.values(personalizedArtworkPayload),
            async (payload) => {
                let finalPayload = appendFormData(payload, ['product_id', productID])
                const res3 = await generatePersonalizedArtworkv3(finalPayload)
                if (!res3.success) throw new Error(res3.message)
            },
            {concurrency: 2}
        )

        if (storeMode === 'normal') {
            setCampaigns((prevCampaigns) => {
                return update(prevCampaigns, {
                    [campaignIndex]: {
                        url: {$set: res1.data.url},
                    },
                })
            })
        }

        setCampaigns((prevCampaigns) => {
            return update(prevCampaigns, {
                [campaignIndex]: {
                    status: {$set: 'Completed'},
                },
            })
        })

        // 5. Request get variant images
        let res5 = null
        if (storeMode === 'normal') {
            res5 = await searchVariants(productID, [], {limit: 10000})
        }

        if (res5 && res5.success) {
            let totalMockup = 0
            let images = []
            for (let i = 0; i < res5.data.total; i++) {
                const {image_uris = []} = res5.data.variants[i]

                totalMockup += image_uris.length
                images = images.concat(image_uris)
            }

            setCampaigns((prevCampaigns) => {
                return update(prevCampaigns, {
                    [campaignIndex]: {
                        mockup: {
                            total: {$set: totalMockup},
                            images: {$set: images},
                        },
                    },
                })
            })
        }

        return true
    } catch (e) {
        handleError(setCampaigns, campaignIndex, e.message, productIDCreated)
    }
}

export const createCampaignSplit = async (params) => {
    const {
        campaign,
        campaignIndex,
        productLines,
        setCampaigns,
        campaignDetails,
        storeSettings,
        personalizedArtworkPayload,
    } = params

    try {
        setCampaigns((prevCampaigns) => {
            return update(prevCampaigns, {
                [campaignIndex]: {
                    status: {$set: 'Uploading'},
                },
            })
        })

        const storeMode = storeSettings.getStoreMode()

        // 1. Request create product
        const payload1 = {
            ...campaignDetails,
            collections: !Array.isArray(campaignDetails.collections)
                ? []
                : campaignDetails.collections.map((collection) => collection.value),
            title: campaign.title,
            description: campaignDetails.description,
            productLines: productLines.map((product) => {
                const {attributes, variants} = product

                return {
                    ...product,
                    variants: variants
                        .filter((variant) => variant.is_selected)
                        .map(({input_price, ...rest}) => ({...rest, retail_price: input_price})),
                    attributes: attributes.map((attribute) => {
                        const selectedValues = attribute.values.filter((item) => item.is_selected)
                        const filteredValues = _.sortBy(selectedValues, ['position'])

                        return {
                            ...attribute,
                            values: filteredValues,
                        }
                    }),
                }
            }),
        }

        const res1 = await createProductPODV3(payload1)

        // eslint-disable-next-line
        if (!res1.success) throw {message: res1.message}

        const productIDs = res1.data.map((product) => product._id)

        const uploadStatus = {
            success: [], // product ids
            failed: [], // product ids
        }

        // 3. Request upload artwork
        await Bluebird.map(
            productLines,
            async (productLine, index) => {
                const {data, success} = await uploadArtworkProductLine({
                    index,
                    product_type: productLine.product_type,
                    productIDs,
                    personalizedArtworkPayload: personalizedArtworkPayload[productLine._id],
                    setCampaigns,
                    campaignIndex,
                })

                if (success) {
                    uploadStatus.success.push(data)
                } else {
                    uploadStatus.failed.push(data)
                }
            },
            {concurrency: 2}
        )

        if (uploadStatus.failed.length > 0) {
            deleteProducts(
                uploadStatus.failed.map((item) => item.productId),
                {}
            )
        }

        // Show product url
        if (storeMode === 'normal') {
            setCampaigns((prevCampaigns) => {
                return update(prevCampaigns, {
                    [campaignIndex]: {
                        productLines: {
                            $apply: (productLines) => {
                                return productLines.map((product, index) => ({
                                    ...product,
                                    url: _.get(res1, `data.${index}.url`),
                                }))
                            },
                        },
                        status: {$set: 'Completed'},
                    },
                })
            })
        }

        setCampaigns((prevCampaigns) => {
            return update(prevCampaigns, {
                [campaignIndex]: {
                    status: {$set: 'Completed'},
                },
            })
        })

        // 5. Request get variant images
        let res5 = null

        if (uploadStatus.success.length > 0) {
            if (storeMode === 'normal') {
                res5 = await Promise.all(
                    uploadStatus.success.map((item) => searchVariants(item.productId, [], {limit: 10000}))
                )
            }
        }

        if (res5) {
            setCampaigns((prevCampaigns) => {
                return update(prevCampaigns, {
                    [campaignIndex]: {
                        productLines: {
                            $apply: (productLines) => {
                                return productLines.map((product, index) => {
                                    if (!_.get(res5, `${index}.success`)) return product

                                    let totalMockup = 0
                                    let images = []
                                    for (let i = 0; i < res5[index].data.total; i++) {
                                        const {image_uris = []} = res5[index].data.variants[i]

                                        totalMockup += image_uris.length
                                        images = images.concat(image_uris)
                                    }

                                    return {
                                        ...product,
                                        mockup: {
                                            total: totalMockup,
                                            images: images,
                                        },
                                    }
                                })
                            },
                        },
                    },
                })
            })
        }

        return true
    } catch (e) {
        handleError(setCampaigns, campaignIndex, e.message, e.productID)
    }
}

export const getArtworkDisplay = (contextState, campaignIndex, side) => {
    const {activeCampaignIndex, campaigns, products, activeProductIndex} = contextState

    // Use general artworks for campaign is inactivate
    if (activeCampaignIndex !== campaignIndex) {
        return campaigns[campaignIndex].artworks[side]
    }

    const activeProductType = products[activeProductIndex].product_type
    const isLinkArtwork = campaigns[campaignIndex].artworkByProduct[activeProductType].linkArtwork

    if (isLinkArtwork) {
        return campaigns[campaignIndex].artworks[side]
    }

    return campaigns[campaignIndex].artworkByProduct[activeProductType].sides[side]
}

const appendFormData = (payload, [key, value]) => {
    if (payload.has(key)) {
        payload.set(key, value)
    } else {
        payload.append(key, value)
    }
    return payload
}

export const generateArtworkByWebworker = async (areas, image_width, image_height, scale = 1) => {
    const imageAreas = []
    const fetchImages = async () => {
        const areaKeys = Object.keys(areas)
        await Bluebird.map(
            areaKeys,
            async (key) => {
                const area = areas[key]
                const response = await fetch(area.template_url)
                const blob = await response.blob()
                const url = URL.createObjectURL(blob)
                const imageArea = {
                    blobUrl: url,
                    top: area.position.top,
                    left: area.position.left,
                }
                imageAreas.push(imageArea)
            },
            {
                concurrency: 1,
            }
        )
    }

    await fetchImages().catch(console.error)

    const images = imageAreas.map((imageArea) => ({
        ...imageArea,
        top: imageArea.top * scale,
        left: imageArea.left * scale,
    }))

    const result = await composite({
        images,
        scale: 1,
        width: image_width * scale,
        height: image_height * scale,
    })

    // downloadFile(URL.createObjectURL(result), 'AllImages')

    return URL.createObjectURL(result)
}

