const path = require('path');
const common = require('./webpack.common');
const {merge} = require('webpack-merge');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = merge(common, {
    mode: 'development',
    plugins: [new ESLintPlugin({
        fix: true,
    })],
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
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            esModule: false,
                        },
                    },
                ],
            },
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
