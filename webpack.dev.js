const path = require('path');
const common = require('./webpack.common');
const {merge} = require('webpack-merge');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = merge(common, {
    mode: 'development',
    plugins: [new ESLintPlugin()],
    output: {
        filename: 'main.[contenthash].js',
        path: path.resolve(__dirname, './dev'),
    },
    devtool: 'source-map',
    devServer: {
        static: {
            directory: path.join(__dirname, 'dev'),
        },
        compress: true,
        watchFiles: {
            paths: [
                'src/**/*.html',
            ],
        },
        port: 9000,
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                include: path.resolve(__dirname, 'src/sass'),
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
        ]},
});
