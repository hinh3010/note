const WorkboxWebpackPlugin = require('workbox-webpack-plugin')
const path = require('path')
const fs = require('fs')

const isProduction = process.env.NODE_ENV === 'production'

const manifestFile = path.join(__dirname, 'public', 'manifest.appcache')
const revision = fs.statSync(manifestFile).mtimeMs.toString()
const manifest = fs.readFileSync(manifestFile, 'utf8')
const manifestEntries = manifest.split('\n').filter((line) => {
    return line.trim() !== 'CACHE MANIFEST' && line.trim() !== ''
})

console.log('manifestEntries are being to prefetch:', manifestEntries)

module.exports = {
    entry: './src/service-workers/index.js', // An empty or minimal JS file
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'mockup-generator.sw.js', // This output file won't be used
    },
    plugins: [
        new WorkboxWebpackPlugin.GenerateSW({
            swDest: 'mockup-generator.service-worker.js',
            clientsClaim: true,
            skipWaiting: true,
            maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
            additionalManifestEntries: manifestEntries.map((entry) => {
                return {
                    url: entry,
                    revision,
                }
            }),
        }),
    ],
    // mode: isProduction ? 'production' : 'development',
    mode: isProduction ? 'production' : 'production',
};
