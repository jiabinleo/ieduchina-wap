'use strict'

// process.on('exit', function() {

// });

// if(!process.argv[2]) {
// 	console.error('请输入文件名称 如home或者user/login');
// 	process.exit(1)
// }

const path = require('path');
const fs = require('fs');
const fileSave = require('file-save');
const pageList = require('../config/pages.js');

function pageResove(dir) {
	return path.join(__dirname, '../../', './src/pages', dir);
}

const Files = {
html:function(title){
	return `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
	<%= require('@layouts/meta.ejs')()%>
	<%= require('@layouts/css.ejs')()%>
	<title>${title}</title>
	<%= require('@layouts/ie.ejs')()%>
</head>
<body>
	<%= require('@layouts/header.ejs')()%>
	<p>${title}</p>
	<%= require('@layouts/footer.ejs')()%>
</body>
</html>
`
},
	js: function(name) {
		return `var page = {
  init() {
    console.log("页面初始化");
  }
};

page.init();
`
	},
}

function buildFile() {
	var len = pageList.length,
		i = 0,
		title;
	while(i < len) {
		let item = pageList[i];
		i++;
		fs.access(pageResove(item.template), (err)=> {
			
			if(!err) {
				return;
			}
			title=item.title;
			console.log('新建文件: ' + item.template)
			
			//新建html
			fileSave(pageResove(item.template))
			  .write(Files.html(title), 'utf8')
			  .end('\n');
			//新建js
			fileSave(pageResove(item.entry))
			  .write(Files.js(item.name), 'utf8')
			  .end('\n');

			// //新建scss
			// fileSave(pageResove(item.template.replace('.ejs', '.scss')))
			//   .write('', 'utf8')
			//   .end('\n');
			//创建一个components目录
			fs.mkdir(`${pageResove(item.name)}/components`,
				 (err)=>{
					if (err) {
						return;
					}
			    console.log('components目录成功');
			})
			
		})
	}
}

buildFile();