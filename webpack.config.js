const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");


const DEBUG = typeof process.env.NODE_ENV === 'undefined' || process.env.NODE_ENV === "development";

module.exports = {
    entry: './src/app.js',
    output:{
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: 'source-map',
    mode: DEBUG ? 'development' : 'production',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    },
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
            },
            {
                test: /\.scss$/,
                loaders: DEBUG ? 
                    ['style-loader', 'css-loader?sourceMap', 'postcss-loader', 'sass-loader?sourceMap']
                    : [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']

                
            }
        ]
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCssAssetsPlugin({})
        ]
    },
    plugins: [new HtmlWebpackPlugin(), new MiniCssExtractPlugin({
        filename: "[name].min.css",
        allChunks: true})
    ],
}