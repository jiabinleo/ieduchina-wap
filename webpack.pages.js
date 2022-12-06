const HtmlWebpackPlugin = require("html-webpack-plugin");
const pages = [
    {
        template: "index",
        defaults: false
    },
    {
        template:"wenzhangdetail",
        defaults:true
    }
]

let htmlTemplate = [];
let entry = {};
const defaultTemplate = [];
const defaultEntry = {};
for (let index = 0; index < pages.length; index++) {
    let { template, chunk, defaults } = pages[index];
    chunk || (chunk = template)
    entry[chunk] = `./src/js/${chunk}.ts`
    htmlTemplate.push(new HtmlWebpackPlugin({
        template: `./src/${template}.ejs`,
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
        defaultEntry.index = `./src/js/${chunk}.ts`
        defaultTemplate.push(new HtmlWebpackPlugin({
            template: `./src/${template}.ejs`,
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
}
module.exports = {
    entry,
    htmlTemplate
}