const path = require('path');
const common = require('./webpack.common');
const {merge} = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
    mode: 'production',
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
    ],
    output: {
        filename: 'main.[contenthash].js',
        path: path.resolve(__dirname, '../dist'),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                include: path.resolve(__dirname, '../src/sass'),
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(?:js|mjs|cjs)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
        ]},
});
