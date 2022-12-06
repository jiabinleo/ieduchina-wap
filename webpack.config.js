const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {
    BundleAnalyzerPlugin
} = require('webpack-bundle-analyzer');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasurePlugin();
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const isdev = process.env.NODE_ENV == "development";
const { htmlTemplate, entry } = require('./webpack.pages');
const fs = require("fs")
const moduleConfig = {
    entry,
    output: {
        filename: "js/[name].js?t=[contenthash:8]",
        path: path.resolve(__dirname, "dist"),
        clean: true
    },
    cache: {
        type: "filesystem",
    },
    module: {
        rules: [{
            test: /\.(less)$/i,
            use: [isdev ? "style-loader" : MiniCssExtractPlugin.loader, {
                loader: "css-loader",
                options: {
                    modules: false
                }
            }, "postcss-loader", "less-loader"]
        },
        {
            test: /\.(png|gif|jpg|jpeg|svg)$/,
            type: "asset/resource",
            // use: [
            //     {
            //         loader: 'image-webpack-loader',// 压缩图片
            //         options: {
            //             bypassOnDebug: true,
            //         }
            //     }
            // ],
            generator: {
                filename: 'images/[contenthash:8][ext]'
            }
        },
        {
            test: /\.html$/,
            loader: "html-loader",
            options: {
                esModule: true
            }
        },
        {
            test: /\.ejs$/,
            loader: "ejs-loader",
            options: {
                esModule: false,
                attrs: [':data-src', ":src"]
            }
        },
        {
            test: /\.tsx?$/,
            loader: "ts-loader"
        },
        {
            test: /\.js$/,
            exclude: /node_modules/,
            include: path.resolve(__dirname, "src"),
            use: {
                loader: 'babel-loader',
                options: {
                    sourceMap: "inline",
                    retainLines: true,
                    presets: [
                        ['@babel/preset-env', {
                            useBuiltIns: 'usage',
                            corejs: {
                                version: 3
                            },
                            targets: {
                                chrome: '60',
                                firefox: '60',
                                ie: '9',
                                safari: '10',
                                edge: '17',
                                node: 'current'
                            }
                        }]
                    ],
                    plugins: [
                        ["@babel/plugin-proposal-decorators", { "legacy": true }],
                        ["@babel/plugin-proposal-private-property-in-object", { "loose": true }],
                        ["@babel/plugin-proposal-private-methods", { "loose": true }],
                        ["@babel/plugin-proposal-class-properties", { "loose": true }],
                        ["@babel/transform-for-of"]
                    ],
                    cacheDirectory: false
                }
            }
        }]
    },
    optimization: {
        minimize: false,
        minimizer: [
            new TerserPlugin({
                minify: TerserPlugin.swcMinify,
                terserOptions: {},
            })
        ]
    },
    mode: process.env.NODE_ENV,
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@images': path.resolve(__dirname, `./src/images`),
            '@cs': path.resolve(__dirname, `./src/components`),
            '@data': path.resolve(__dirname, `./src/data`)
        }
    },
    performance: {
        maxEntrypointSize: 10000000,
        maxAssetSize: 30000000
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/[name].css?t=[contenthash:8]"
        }),
    ],
    devServer: {
        watchFiles: ['src/**/*'],
        static: {
            directory: path.join(__dirname, "dist"),
        },
        compress: true,
        port: 8081,
        hot: true,
        open: true,
        allowedHosts: 'all',
        bonjour: true,
        client: {
            progress: true,
        }
    },
    target: "web"
}
if (isdev) {
    moduleConfig.plugins.push(new BundleAnalyzerPlugin())
    module.exports = smp.wrap(moduleConfig)
} else {
    module.exports = moduleConfig
}
moduleConfig.plugins.push(...htmlTemplate);

// moduleConfig.plugins.push(new CopyPlugin({
//     patterns: [
//         {
//             from: path.resolve(__dirname, `./src/plugins/jquery-3.6.0.min.js`),
//             to: path.resolve(__dirname, `./dist/js`)
//         },
//         {
//             from: path.resolve(__dirname, `./src/plugins/swiper.min.js`),
//             to: path.resolve(__dirname, `./dist/js`)
//         },
//         {
//             from: path.resolve(__dirname, `./src/plugins/swiper.min.css`),
//             to: path.resolve(__dirname, `./dist/css`)
//         },
//         {
//             from: path.resolve(__dirname, `./src/plugins/city.js`),
//             to: path.resolve(__dirname, `./dist/js`)
//         },
//         {
//             from: path.resolve(__dirname, `./src/plugins/tinymce`),
//             to: path.resolve(__dirname, `./dist/js`)
//         }
//     ]
// }))
