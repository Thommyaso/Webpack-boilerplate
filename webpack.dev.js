const path = require('path');
const common = require('./webpack.common');
const {merge} = require('webpack-merge');
const ESLintPlugin = require('eslint-webpack-plugin');

const winston = require('winston');

const logger = winston.createLogger({
    level: 'debug',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' }),
    ],
  });
  
  if (process.env.NODE_ENV !== 'production') {
    console.log('inside processssss')
    logger.add(new winston.transports.Console({
      format: winston.format.combine(
          winston.format.colorize(),
      winston.format.simple()
      )
    }));
  }

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
        onListening: (server) => {
            const port = server.options.port;
            logger.info(`Webpack Dev Server is running on port ${port}`);
          },
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
