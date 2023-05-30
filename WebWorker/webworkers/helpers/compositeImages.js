import {PREFIX_LOG} from '../constants/composite.js'

const isSupportedOffscreenCanvas = OffscreenCanvas
const prefix = PREFIX_LOG

// Polyfill OffscreenCanvas
if (!isSupportedOffscreenCanvas) {
    OffscreenCanvas = class OffscreenCanvas {
        constructor(width, height) {
            this.canvas = document.createElement('canvas')
            this.canvas.width = width
            this.canvas.height = height

            this.canvas.convertToBlob = () => {
                return new Promise((resolve) => {
                    this.canvas.toBlob(resolve)
                })
            }

            return this.canvas
        }
    }
}

/**
 * Composite area images into a single image using OffscreenCanvas
 *
 * @param {[{blobUrl: string, top: number, left: number}]} images
 * @param {number} scale
 * @param {number} width
 * @param {number} height
 * @param {boolean} clean
 * @returns {Promise<*>}
 */
const compositeImages = async ({images = [], scale = 1, width = 1000, height = 1000, clean = true}) => {
    const exportMessage = `${prefix} Exporting ${images.length} images from ${width * scale}x${height * scale} canvas`
    console.time(exportMessage)
    const offscreen = new OffscreenCanvas(width * scale, height * scale)
    const ctx = offscreen.getContext('2d')

    const blobUrls = images.map((image) => image.blobUrl)

    const createImageBitmapMessage = `${prefix} Creating ${images.length} bitmaps`
    console.time(createImageBitmapMessage)
    const bitmaps = await Promise.all(
        blobUrls.map(async (blobUrl) => {
            const response = await fetch(blobUrl)
            const blob = await response.blob()
            return createImageBitmap(blob)
        })
    )
    console.timeEnd(createImageBitmapMessage)

    const drawImageMessage = `${prefix} Drawing ${images.length} bitmaps`
    console.time(drawImageMessage)
    bitmaps.forEach((bitmap, index) => {
        const {top, left} = images[index]
        ctx.drawImage(bitmap, left * scale, top * scale, bitmap.width * scale, bitmap.height * scale)
    })
    console.timeEnd(drawImageMessage)

    const exportBlobMessage = `${prefix} Exporting composited ${images.length} images to blob`
    console.time(exportBlobMessage)
    const exportedBlob = await offscreen.convertToBlob()
    console.timeEnd(exportBlobMessage)

    // Clean up resources for saving memory
    if (clean) {
        const cleanMessage = `${prefix} Cleaning ${images.length} images`
        console.time(cleanMessage)
        bitmaps.forEach((bitmap) => {
            bitmap.close()
        })

        blobUrls.forEach((blobUrl) => {
            URL.revokeObjectURL(blobUrl)
        })
        console.timeEnd(cleanMessage)
    }
    console.timeEnd(exportMessage)

    return exportedBlob
}

export default compositeImages

