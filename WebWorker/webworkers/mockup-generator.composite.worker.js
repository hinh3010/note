import * as Comlink from 'comlink'
import compositeImages from './helpers/compositeImages'

/**
 * Composite area images into a single image using OffscreenCanvas
 * Must build the web worker script first: npx webpack --config webpack.composite.worker.config.js
 *
 *
 * @param {[{blobUrl: string, top: number, left: number}]} images
 * @param {number} scale
 * @param {number} width
 * @param {number} height
 * @param {boolean} clean
 * @returns {Promise<*>}
 */
const composite = async ({images = [], scale = 1, width = 1000, height = 1000, clean = true}) => {
    return compositeImages({
        images,
        scale,
        width,
        height,
        clean,
    })
}

Comlink.expose(composite)
