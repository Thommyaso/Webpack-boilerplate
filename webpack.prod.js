const path = require('path');
const common = require('./webpack.common');
const {merge} = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SpritesmithPlugin = require('webpack-spritesmith');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');

module.exports = merge(common, {
    mode: 'production',
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
        new HtmlWebpackTagsPlugin({
            tags: ['./images/sprites/sprite.css'],
            append: true,
        }),
        new SpritesmithPlugin({ // clean option has been switched off in webpack.prod.js to be able to load unused sprites for tests
            src: {
                cwd: path.resolve(__dirname, './src/images/sprites'),
                glob: '*.png', // Adjust this pattern based on your sprite images
            },
            target: {
                image: path.resolve(__dirname, 'dist/images/sprites/sprite.png'), // Adjust output path
                css: path.resolve(__dirname, 'dist/images/sprites/sprite.css'), // Adjust output path
            },
            apiOptions: {
                cssImageRef: './sprite.png', // Adjust image reference in CSS
            },
        }),
    ],
    output: {
        filename: 'main.[contenthash].js',
        path: path.resolve(__dirname, './dist'),
        // clean: true,
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
                            preprocessor: (content, loaderContext) => {
                                content = content.replace(
                                    /<img([^>]*)src=["']\.\/images\/sprites\/([^"']+)["']([^>]*)>/g,
                                    (match, beforeSrc, filenameWithExtension, afterAttributes) => {
                                    // Extract the filename from the path and remove the extension
                                        const filenameWithoutExtension = filenameWithExtension.replace(/\.[^.]+$/, '');

                                        // Extract existing classes from the attributes
                                        const existingClassesMatch = match.match(/class=["'](.*?)["']/);
                                        const existingClasses = existingClassesMatch ? existingClassesMatch[1] : '';

                                        // Create a div with the extracted classes and the original attributes
                                        const newClassName = `icon-${filenameWithoutExtension}`;
                                        let updatedClasses;
                                        if (existingClasses) {
                                            updatedClasses = `${existingClasses} ${newClassName}`;
                                        } else {
                                            updatedClasses = newClassName;
                                        }

                                        const className = `class="${updatedClasses}"`;

                                        return `<div ${className}${afterAttributes}></div>`;
                                    });

                                return content;
                            },


                        },
                    },

                ],
            },
            {
                test: /\.scss$/,
                include: path.resolve(__dirname, 'src/sass'),
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
