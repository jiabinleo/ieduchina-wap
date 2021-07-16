const path = require('path');
const webpack = require("webpack");
const merge = require("webpack-merge");
// 清除目录等
const cleanWebpackPlugin = require("clean-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const extractTextPlugin = require("extract-text-webpack-plugin");
const webpackConfigBase = require('./webpack.base.conf');
const {app} =require('./config/config')
const webpackConfigProd = {
    mode: 'production', // 通过 mode 声明生产环境
    
	output: {
		path: path.resolve(__dirname, '../dist'),
		// 打包多出口文件
        filename: 'js/[name].[hash].js',
		publicPath: ''
    },
    
    devtool: 'cheap-module-eval-source-map',
    
	plugins: [
		//删除dist目录
		new cleanWebpackPlugin(['dist','_dist'], {
			root: path.resolve(__dirname, '../'), //根目录
			verbose: true, //开启在控制台输出信息
			dry: false,
		}),
		new webpack.DefinePlugin({
			'process.env.BASE_URL': '\"' + process.env.BASE_URL + '\"'
		}),
		// 分离css插件参数为提取出去的路径
		new extractTextPlugin({
			filename: 'css/[name].[hash:8].min.css',
		}),
		//压缩css
		new OptimizeCSSPlugin({
			cssProcessorOptions: {
				safe: true
			}
		}),
		//上线压缩 去除console等信息webpack4.x之后去除了webpack.optimize.UglifyJsPlugin
		new UglifyJSPlugin({
			uglifyOptions: {
				compress: {
					warnings: false,
					drop_debugger: false,
					drop_console: true
				}
			}
		}),
		 new webpack.DefinePlugin({
                /**
                 * webpack 会自动将当前环境变量挂载到 process.env.NODE_ENV，无需手动配置
                 * https://webpack.docschina.org/concepts/mode/
                 */
                'process.env.BASE_URL': JSON.stringify('/'), // 将全局变量挂载到 process.env 下的好处是不用处理 eslint 报错的问题
                'process.env.IS_DEV': JSON.stringify(true),
                'process.env.appType':JSON.stringify(app.appType),
                'process.env.appName':JSON.stringify(app.appName)
            })
	]

}
module.exports = merge(webpackConfigBase, webpackConfigProd);