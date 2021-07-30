const path = require('path');
const webpack = require("webpack");
const merge = require("webpack-merge");
const webpackConfigBase = require('./webpack.base.conf');
const cleanWebpackPlugin = require("clean-webpack-plugin");
const {app} =require('./config/config');
const webpackConfigDev = {
	mode: 'development', // 通过 mode 声明开发环境
	output: {
		path: path.resolve(__dirname, '../dist'),
		// 打包多出口文件
		filename: 'js/[name].bundle.js'
	},
	devServer: {
		contentBase: path.join(__dirname, "../src/pages/index"),
		publicPath:'/',
		host: "192.168.3.12",
		port: "8000",
		overlay: true, // 浏览器页面上显示错误
		open: true, // 开启浏览器
		// stats: "errors-only", //stats: "errors-only"表示只打印错误：
		//服务器代理配置项
        proxy: {
            '/testing/*': {
                target: 'https://www.baidu.com',
                secure: true,
                changeOrigin: true
            }
        }
    },
    plugins:[
		//删除dist目录
		new cleanWebpackPlugin(['dist','_dist'], {
			root: path.resolve(__dirname, '../'), //根目录
			verbose: true, //开启在控制台输出信息
			dry: false,
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
module.exports = merge(webpackConfigBase, webpackConfigDev);