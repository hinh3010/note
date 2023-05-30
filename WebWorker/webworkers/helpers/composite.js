import * as Comlink from 'comlink'
import compositeImages from './compositeImages'
import {COMPOSITE_WORKER_SCRIPT_URL, PREFIX_LOG} from '../constants/composite'

const isSupportedOffscreenCanvas = OffscreenCanvas

/**
 * Composite area images into a single image using OffscreenCanvas
 *
 * @param {[{blobUrl: string, top: number, left: number}]} images
 * @param {number} scale
 * @param {number} width
 * @param {number} height
 * @param {boolean} clean
 * @param {boolean} useOffscreenCanvas
 * @returns {Promise<*>}
 */
export default async function composite({
    images = [],
    scale = 1,
    width = 1000,
    height = 1000,
    clean = true,
    useOffscreenCanvas = true,
}) {
    if (!isSupportedOffscreenCanvas) {
        console.warn(`${PREFIX_LOG} OffscreenCanvas is not supported`)
    }

    if (!useOffscreenCanvas || !isSupportedOffscreenCanvas) {
        console.log(`${PREFIX_LOG} Composite images in main thread using Canvas`)
        return compositeImages({
            images,
            scale,
            width,
            height,
            clean,
        })
    } else {
        console.log(`${PREFIX_LOG} Composite images in web worker thread using OffscreenCanvas`)
        const worker = new Worker(COMPOSITE_WORKER_SCRIPT_URL)
        const remoteCompositeFn = Comlink.wrap(worker)

        return remoteCompositeFn({
            images,
            scale,
            width,
            height,
            clean,
        })
    }
}

