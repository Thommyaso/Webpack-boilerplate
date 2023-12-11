const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output : {
        filename: "main.[contenthash].js",
        path: path.resolve(__dirname, "./dist")
    },
    plugins: [new HtmlWebpackPlugin({
        template: "./src/index.html",
        inject: "body",
    })],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    }
}