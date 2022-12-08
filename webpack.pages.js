const HtmlWebpackPlugin = require("html-webpack-plugin");
const Mock = require('mockjs')
const fs = require("fs")
const pages = [
    // {
    //     template: "school_correction_preview",
    //     defaults: false
    // }, {
    //     template: "edition"
    // }, {
    //     template: "schoollistinfo"
    // }, {
    //     template: "school_correction"
    // }, {
    //     template: "wenzhangdetail"
    // }, {
    //     template: "wenzhangdetail2",
    //     defaults: false
    // }, {
    //     template: "jyh_type"
    // }, {
    //     template: "jyh_login"
    // }, {
    //     template: "user_center_activitys",
    //     chunk: "user_center"
    // }, {
    //     template: "user_center_video",
    //     chunk: "user_center"
    // }, {
    //     template: "user_center"
    // }, 
    // {
    //     template: "index",
    //     defaults: false,
    //     desc: "首页",
    //     chunk: "index"
    // }, 
    {
        template: "wenzhang",
        defaults: true,
        desc: "文章页",
        chunk: "wenzhang",
    },
    // {
    //     template: "video",
    //     chunk: "videolist"
    // }, {
    //     template: "user"
    // }, {
    //     template: "pubvideo",
    //     chunk: "user",
    //     defaults: false
    // }, {
    //     template: "ap",
    //     defaults: false
    // },{
    //     template:"map",
    //     defaults:false
    // },
    // {
    //     template: "huodong",
    //     defaults: false,
    //     desc: "活动列表页"
    // }
]

let htmlTemplate = [];
let entry = {};
let data = {}
const defaultTemplate = [];
const defaultEntry = {};
const defaultData = {}
for (let index = 0; index < pages.length; index++) {
    let { template, chunk, defaults } = pages[index];
    chunk || (chunk = template);
    entry[chunk] = `./src/pages/${chunk}/index.ts`
    data[chunk] = `./src/pages/${chunk}/mock.js`
    htmlTemplate.push(new HtmlWebpackPlugin({
        template: `./src/pages/${chunk}/index.ejs`,
        hash: false,
        minify: {
            collapseWhitespace: true,
            keepClosingSlash: true,
            removeComments: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            useShortDoctype: true
        },
        inject: "body",
        filename: `${template}.html`,
        xhtml: true,
        showErrors: true,
        chunks: [chunk]
    }))
    if (defaults) {
        defaultData.index = `./src/pages/${chunk}/mock.js`
        defaultEntry.index = `./src/pages/${chunk}/index.ts`
        defaultTemplate.push(new HtmlWebpackPlugin({
            template: `./src/pages/${template}/index.ejs`,
            hash: false,
            minify: {
                collapseWhitespace: true,
                keepClosingSlash: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            },
            inject: "body",
            filename: `index.html`,
            xhtml: true,
            showErrors: true,
            chunks: "index"
        }))
    }
}
if (JSON.stringify(defaultEntry) !== '{}') {
    entry = defaultEntry
    htmlTemplate = defaultTemplate
    data = defaultData
}
for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
        fs.access(data[key], (err) => {
            if (!err) {
                let file = require(data[key])
                for (let i = 0; i < pages.length; i++) {
                    if (pages[i].template == key) {
                        pages[i].mock = true
                    }
                }
                fs.writeFile(data[key].split(".js")[0] + ".json", JSON.stringify(Mock.mock(file)), function (err) {
                    if (err) {
                        console.error(`${key}创建失败`);
                        return console.log(err)
                    }
                })
            }
        })
    }
}
setTimeout(() => {
    console.table(pages)
}, 3000)
module.exports = {
    entry,
    htmlTemplate
}