const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {
    BundleAnalyzerPlugin
} = require('webpack-bundle-analyzer');
// const ESLintPlugin = require('eslint-webpack-plugin');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasurePlugin();
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin=require('copy-webpack-plugin');
console.log(process.env.NODE_ENV)
const isdev = process.env.NODE_ENV == "development";
const moduleConfig = {
    entry: {
        abroad: `./src/js/abroad.js`,
        schoollistinfo:`./src/js/schoollistinfo.js`
    },
    output: {
        filename: "js/[name].js?t=[contenthash:8]",
        path: path.resolve(__dirname, "dist"),
        clean: true
    },
    module: {
        rules: [{
            test: /\.(css|less)$/i,
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
            loader: 'image-webpack-loader',// 压缩图片
            options: {
                bypassOnDebug: true,
            },
            generator: {
                filename: 'images/[contenthash:8][ext]'
            }
        },
        {
            test: /\.html$/,
            loader: "html-loader",
            options: {
                esModule: true,
                minimize: true
            }
        },
        {
            test: /\.ejs$/,
            loader: "ejs-loader",
            options: {
                esModule: false,
                attrs: ['data-src', "src"]
            }
        },
        {
            test: /\.js$/,
            exclude: /node_modules/,
            include: path.resolve(__dirname, "src"),
            use: {
                loader: 'babel-loader',
                options: {
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
            })]
    },
    mode: process.env.NODE_ENV,
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/[name].css?t=[contenthash:8]"
        }),
        new HtmlWebpackPlugin({
            template: `./src/schoollistinfo.ejs`,
            hash: false,
            minify: {
                collapseWhitespace: true, //删除空格
                removeComments: true, // 删除注释
            },
            inject: "body",
            filename: "schoollistinfo.html",
            xhtml: true,
            showErrors: true,
            chunks: ['schoollistinfo']
        }),
        new HtmlWebpackPlugin({
            template: `./src/abroad.ejs`,
            hash: false,
            minify: {
                collapseWhitespace: true, //删除空格
                removeComments: true, // 删除注释
            },
            inject: "body",
            filename: "abroad.html",
            xhtml: true,
            showErrors: true,
            chunks: ['abroad']
        })
        // new webpack.DefinePlugin({
        //     process.env.NODE_ENV
        // })
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '../src'),
            '@layouts': path.resolve(__dirname, './src/layouts'),
            '@images': path.resolve(__dirname, `./src/images`),
            '@data': path.resolve(__dirname, './src/data')
        }
    },
    performance: {
        maxEntrypointSize: 10000000,
        maxAssetSize: 30000000
    },
    devServer: {
        watchFiles: ['src/**/*'],
        static: {
            directory: path.join(__dirname, ".src/index.ejs"),
        },
        compress: true,
        port:8089,
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
    moduleConfig.plugins.push(new BundleAnalyzerPlugin());
    module.exports = smp.wrap(moduleConfig)
} else {
    module.exports = moduleConfig
}
