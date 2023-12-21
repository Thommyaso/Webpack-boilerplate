const path = require('path');
const {merge} = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
const sprites = require('./webpack.sprites');
const common = require('./webpack.common');

module.exports = merge(common, sprites, {
    mode: 'production',
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
        new HtmlWebpackTagsPlugin({
            tags: ['./images/sprites/sprite.css'],
            append: true,
        }),
    ],
    output: {
        filename: 'main.[contenthash].js',
        path: path.resolve(__dirname, '../dist'),
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
