const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const SpritesmithPlugin = require('webpack-spritesmith');


module.exports = {
    entry: './src/index.js',
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: 'body',
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
              cssImageRef: '~sprite.png',  // Adjust image reference in CSS
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
                              // Replace img tags with div and inject src as class
                              return content.replace(/<img([^>]*)>/g, (match, attributes) => {
                                // Extract the value of the src attribute
                                const srcValue = attributes.match(/src=["'](.*?)["']/);
                                
                                // Create a div with the extracted class and the original attributes
                                const className = srcValue ? `class="${srcValue[1]}"` : '';
                                return `<div ${className}></div>`;
                              });
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
            /* {
                test: /src\/images\/sprites/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                      name: '[name].[ext]',
                      outputPath: 'images/sprites', // or any other output directory
                    },
                  },
                  {
                    loader: 'image-webpack-loader',
                    options: {
                        mozjpeg: {
                          progressive: true,
                        },
                        // optipng.enabled: false will disable optipng
                        optipng: {
                          enabled: false,
                        },
                        pngquant: {
                          quality: [0.65, 0.90],
                          speed: 4
                        },
                        gifsicle: {
                          interlaced: false,
                        },
                        // the webp option will enable WEBP
                        webp: {
                          quality: 75
                        }
                      }
                  },
                ],
              }, */
            
        ],
    },
};
