const path = require('path')
const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
    entry: './src/app/mockup-generator-3.2/webworkers/mockup-generator.composite.worker.js',
    output: {
        filename: 'mockup-generator.composite.worker.js',
        path: path.resolve(__dirname, 'public'),
    },
    resolve: {
        extensions: ['.js'],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
        ],
    },
    // mode: isProduction ? 'production' : 'development',
    mode: isProduction ? 'production' : 'production',
}
