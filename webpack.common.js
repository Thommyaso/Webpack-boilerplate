const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const SpritesmithPlugin = require('webpack-spritesmith');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');


module.exports = {
    entry: './src/index.js',
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: 'body',
            //customHeadTags: '<link rel="stylesheet" href="./images/sprites/sprite.css">',
        }),
        new HtmlWebpackTagsPlugin({
          tags: ['./images/sprites/sprite.css'],
          append: true,
      }),
        new SpritesmithPlugin({   // clean option has been switched off in webpack.prod.js to be able to load unused sprites for tests
            src: {
              cwd: path.resolve(__dirname, './src/images/sprites'),
              glob: '*.png',  // Adjust this pattern based on your sprite images
            },
            target: {
              image: path.resolve(__dirname, 'dist/images/sprites/sprite.png'),  // Adjust output path
              css: path.resolve(__dirname, 'dist/images/sprites/sprite.css'),  // Adjust output path
            },
            apiOptions: {
              cssImageRef: './sprite.png',  // Adjust image reference in CSS
            },
          }),
    ],
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
                            content = content.replace(/<img([^>]*)>/g, (match, attributes) => {
                                // Extract the value of the src attribute
                                const srcValue = attributes.match(/src=["'](.*?)["']/);
                
                                if (srcValue) {
                                    // Extract the filename from the path and remove the extension
                                    const filenameWithExtension = srcValue[1].split('/').pop();
                                    const filenameWithoutExtension = filenameWithExtension.replace(/\.[^.]+$/, '');
                
                                    // Extract existing classes from the attributes
                                    const existingClassesMatch = attributes.match(/class=["'](.*?)["']/);
                                    const existingClasses = existingClassesMatch ? existingClassesMatch[1] : '';
                
                                    // Create a div with the extracted classes and the original attributes
                                    const newClassName = `icon-${filenameWithoutExtension}`;
                                    const className = `class="${existingClasses} ${newClassName}"`;
                
                                    return `<div ${className}></div>`;
                                } else {
                                    // If src attribute is not found, just create an empty div
                                    return '<div></div>';
                                }
                            });
                
                            return content;
                        },
                    },
                },
                
                ],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                exclude: /src\/images\/sprites/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[hash].[ext]',
                            outputPath: 'images',
                        },
                    },
                ],
            },
        ],
    },
};
