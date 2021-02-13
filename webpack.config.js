const path = require('path')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const CopyPlugin = require("copy-webpack-plugin")

const IS_DEVELOPMENT = process.env.NODE_ENV === 'dev'

if (IS_DEVELOPMENT) {
    console.log('development:', IS_DEVELOPMENT)
}

const filename = ext => IS_DEVELOPMENT ? `[name].${ext}` : `[name].[hash].${ext}`

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    }

    if (!IS_DEVELOPMENT) {
        config.minimizer = [
            new OptimizeCssAssetWebpackPlugin(),
            new TerserWebpackPlugin()
        ]
    }

    return config
}

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',

    entry: [
        './index.js',
        './styles/style.scss'
    ],

    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist')
    },

    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        },
        modules: [
            path.resolve(__dirname, 'node_modules')
        ]
    },

    devtool: IS_DEVELOPMENT ? 'source-map' : '',
    devServer: {
        port: 9000,
        hot: IS_DEVELOPMENT
    },

    optimization: optimization(),
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'stokkoya-house.html',
            template: 'stokkoya-house.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'adidas.html',
            template: 'adidas.html'
        }),
        new MiniCssExtractPlugin({
            filename: filename('css')
        }),
        new CopyPlugin([
            { from: "./assets/icons" },
            { from: "./assets/mp4" }
        ])
    ],

    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env'
                            ]
                        ]
                    }
                }
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg|woff2|woff|ttf|otf|eot?)$/,
                loader: 'file-loader',
                options: {
                    name(file) {
                        if (IS_DEVELOPMENT) {
                            return '[path][name].[ext]'
                        }

                        return '[hash].[ext]'
                    }
                }
            }
        ]
    }
}
