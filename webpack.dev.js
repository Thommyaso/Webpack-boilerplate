const path = require("path");
const common = require("./webpack.common")
const {merge} = require("webpack-merge")

module.exports = merge(common, {
    mode: "development",
    output : {
        filename: "main.[contenthash].js",
        path: path.resolve(__dirname, "./dist"),
    },
    devServer: {
        static: {
          directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        watchFiles: {
            paths: [
                "src/**/*.html"
            ],
        },
        port: 9000,
      },
})