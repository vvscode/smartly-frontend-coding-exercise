const { resolve, join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const htmlPlugin = new HtmlWebpackPlugin({
    template: "./src/index.html",
    filename: "./index.html"
});
const apiMocker = require("mocker-api");

module.exports = {
    entry: resolve('./src/index.tsx'),
    devtool: 'inline-source-map',
    module: {
        rules: [
            // {
            //     test: /\.tsx?$/,
            //     use: 'ts-loader',
            //     exclude: /node_modules/,
            // },
            {
                test: /\.tsx?$/,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"]
            }
        ],
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
    },
    output: {
        filename: 'bundle.js',
        path: resolve(__dirname, 'dist'),
    },
    devServer: {
        contentBase: resolve("./src"),
        compress: true,
        port: 8050,
        host: "0.0.0.0",
        hot: true,
        open: true,
        before: app => {
            apiMocker(app, resolve("./config/jest/mocks.js"), {
                changeHost: true
            });
        }
    }
};
