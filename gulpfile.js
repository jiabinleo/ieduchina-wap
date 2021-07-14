//https://blog.csdn.net/u012937029/article/details/56924434 各种有用的插件介绍
const gulp = require('gulp'),
    imagemin = require('gulp-imagemin'), //压缩图片  
    htmlMin = require('gulp-htmlmin'), //压缩html 
    htmlbeautify = require('gulp-html-beautify'), //格式化html
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    del = require('del'),
    babel = require("gulp-babel"),
    browserSync = require("browser-sync").create(); //浏览器实时刷新  

const workPath = {
    entry: 'dist', //webpack打包后的文件目录
    output: '_dist'//gulp打包后的文件目录
};
const entryPath = {
    entry_html: 'dist/*.html',
    entry_images: 'dist/static/images/**/*',
    entry_script: 'dist/static/js/*.js',
    entry_css: 'dist/static/css/*.css'
};
const outputPath = {
    output_html: workPath.output,
    output_images: '_dist/static/images',
    output_script: '_dist/static/js',
    output_css: '_dist/static/css',
};
const concatCssName='main.css';
const imgMinOpt={
    mozjpegOpt:{
        quality: 60, progressive: true
    },
    interlaced:true,
    optimizationLevel:4
}
const htmlbeautifyOpt={
    indentSize:2
}
//删除dist下的所有文件  
gulp.task('delete',(cb)=> {
    return del([workPath.output + '/*'], cb);
});

// 压缩图片  
gulp.task('images',  ()=>{
    return gulp.src(entryPath.entry_images) //images下层图片以及下层文件夹里面的图片
        .pipe(imagemin([
            imagemin.gifsicle(imgMinOpt.interlaced),
            imagemin.mozjpeg(imgMinOpt.mozjpegOpt),
            imagemin.optipng(imgMinOpt.optimizationLevel),
            imagemin.svgo({
                plugins: [
                    { removeViewBox: true },
                    { cleanupIDs: false }
                ]
            })
        ]))
        .pipe(gulp.dest(outputPath.output_images));
});
//css 增加浏览器前缀并合并
gulp.task('css', () => {
    return gulp.src(entryPath.entry_css)
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(concat(concatCssName))
        .pipe(gulp.dest(outputPath.output_css))
});

//压缩js，慎用命令 
gulp.task("js", ()=> {
    return gulp.src([entryPath.entry_script, "!" + workPath.entry + "/plugins/**/*.js"])
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest(outputPath.output_script))
        .pipe(browserSync.reload({ stream: true }));
});

//压缩html，慎用命令  
gulp.task('html', ()=> {
    var options = {
        // removeComments: true, //清除HTML注释  
        // allowEmpty:true,
        // collapseWhitespace: true, //压缩HTML  
        removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"  
        collapseBooleanAttributes: false, //省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: false, //删除所有空格作属性值 <input id="" /> ==> <input />
        removeStyleLinkTypeAttributes: false,
        minifyJS: false, //压缩页面JS  
        minifyCSS: false, //压缩页面CSS  
    };

    return gulp.src(entryPath.entry_html)
        .pipe(htmlMin(options))
        .pipe(htmlbeautify(htmlbeautifyOpt.indentSize))
        .pipe(gulp.dest(workPath.output))
        .pipe(browserSync.reload({ stream: true }));
});

//复制静态文件
gulp.task('copy', ()=> {
    return gulp.src(workPath.entry + '/static/**/*')
        .pipe(gulp.dest(workPath.output + '/static'));
});

//启动dist 下的项目
gulp.task('serve', function () {
    browserSync.init({
        watch: true,
        port: 2021,
        server: {
            baseDir: workPath.entry,
            index: "./index.html"
        }
    });
    browserSync.watch(['**/*.css','**/*.js','**/*.html'], {ignored: '*.map.css'});
});
gulp.task('app', gulp.series('delete','copy','js','html','serve'));