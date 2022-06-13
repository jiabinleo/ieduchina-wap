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
console.log(process.env.NODE_ENV)
const isdev = process.env.NODE_ENV == "development";
const glob = require("glob");
const entry = {};
const template=[];
glob.sync("./src/**.ejs").forEach((page)=>{
    if(page !== "./src/schoollist2.ejs"){
        entry[page.replace("./src/","").replace(".ejs","")]=page.replace("./src/","./src/js/").replace(".ejs",".js");
        template.push(new HtmlWebpackPlugin({
            template: page,
            hash: false,
            minify: {
                collapseWhitespace: true,//压缩html
                keepClosingSlash: true,//添加闭合标签
                removeComments: true,//删除注释
                removeRedundantAttributes: false,//删除默认属性
                removeScriptTypeAttributes: true,//删除script的type属性
                removeStyleLinkTypeAttributes: true,//删除link的type属性
                useShortDoctype: true//小写doctype html
            },
            inject: "body",
            filename: page.replace("./src/","").replace(".ejs",".html"),
            xhtml: true,
            showErrors: true,
            chunks: [page.replace("./src/","").replace(".ejs","")]
        }))
    }
})
const moduleConfig = {
    entry,
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
            directory: path.join(__dirname, "./dist/"),
        },
        compress: true,
        hot: true,
        open: true,
        port:1234,
        allowedHosts: 'all',
        bonjour: true,
        client: {
            progress: true,
        }
    },
    target: "web"
}
const plugin = [new MiniCssExtractPlugin({
    filename: "css/[name].css?t=[contenthash:8]"
})]
moduleConfig.plugins = [...plugin,...template]
if (isdev) {
    moduleConfig.plugins.push(new BundleAnalyzerPlugin());
    module.exports = smp.wrap(moduleConfig)
} else {
    module.exports = moduleConfig
}
