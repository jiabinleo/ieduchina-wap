const Mock = require('mockjs')
const Random = Mock.Random;
let j = 0,
    schools = ['上海哈罗外籍人员子女学校', '深圳前海哈罗外籍人员子女学校', '常州卡迪夫学校', '广州修仕倍励外籍人员子女学校', '国际教育网升学中心', '上海宏润博源学校'],
    banner = [],
    hours24 = [],
    video = [],
    video2 = [],
    banner_list = [],
    focustoday = [],
    focustoday_list = [],
    dynamic = [],
    hot_title = ['热门', '深圳', '香港', '广州', '北京', '上海', '杭州', '更多'],
    video_detail={
        image:"https://api.ixiaowai.cn/gqapi/gqapi.php",
        title:"这里是标题",
        time:"2022-12-08 16:46",
        active:true,
        num:100,
        list:[{
            src:"./",
            image:"https://api.ixiaowai.cn/gqapi/gqapi.php",
            title:"这里是标题",
            view:100,
            active:true,
            zan:11
        },
        {
            src:"./",
            image:"https://api.ixiaowai.cn/gqapi/gqapi.php",
            title:"这里是标题",
            view:100,
            active:true,
            zan:11
        },
        {
            src:"./",
            image:"https://api.ixiaowai.cn/gqapi/gqapi.php",
            title:"这里是标题",
            view:100,
            active:true,
            zan:11
        }]
    },
    class_table = [
        {
            class: "y",
            title: "幼儿园"
        },
        {
            class: "x",
            title: "小学"
        },
        {
            class: "c",
            title: "初中"
        },
        {
            class: "g",
            title: "高中"
        }
    ],
    hot_school = [],
    info = [],
    info_title = [{
        name: '校园资讯',
        src: "//www.ieduchina.com/school/"
    }, {
        name: '家庭资讯',
        src: "//www.ieduchina.com/parents/"
    }, {
        name: '留学资讯',
        src: "//www.ieduchina.com/abroad/"
    }, {
        name: '备考资讯',
        src: "//www.ieduchina.com/training/"
    }, {
        name: '最新时讯',
        src: "//www.ieduchina.com/school/news//"
    }],
    video_list1 = [],
    video_list2 = [];
for (let i = 0; i < 12; i++) {
    if (i < 3) {
        banner.push({
            'id': i,
            // 'image': `https://source.unsplash.com/user/raaminka/900x420/?daily`,
            // 'image':`https://cdn.seovx.com?mom=302`
            // 'image':`https://cdn.seovx.com/ha/?mom=303`
            'image': `https://api.ixiaowai.cn/gqapi/gqapi.php?t=${j++}`
        })
    }
    if (i < 6) {
        hours24.push({
            'id': i,
            'title': [Random.cparagraph(1, 10)]
        })
        video.push({
            'id': i,
            // 'image': `https://source.unsplash.com/user/raaminka/270x180/?daily`,
            'image': `https://api.ixiaowai.cn/gqapi/gqapi.php?t=${j++}`,
            'title': Random.cparagraph(1),
            'view': Random.integer(0, 10000),
            'zan': Random.integer(0, 10000)
        })
        focustoday.push({
            'id': i,
            // 'image': `https://source.unsplash.com/random/270x${150 + j++}`,
            'image': `https://api.ixiaowai.cn/gqapi/gqapi.php?t=${j++}`,
            'title': Random.cparagraph(1, 4),
            'author': schools[Math.floor(Math.random() * 6)],
            // 'authorimg': `https://source.unsplash.com/random/20x${20 + j++}`,
            'authorimg': `https://api.ixiaowai.cn/gqapi/gqapi.php?t=${j++}`,
            'time': `${i}分钟前`
        })
    }
    if (i < 9) {
        video2.push({
            'id': i,
            // 'image': `https://source.unsplash.com/random/270x$${180 + j++}`,
            'image': `https://api.ixiaowai.cn/gqapi/gqapi.php?t=${j++}`,
            'title': Random.cparagraph(1),
            'view': Random.integer(0, 10000),
            'zan': Random.integer(0, 10000)
        })
    }
    if (i < 9) {
        let year = new Date().getFullYear(),
            date = j,
            month = new Date().getMonth() + 1;
        if (date > 30) {
            date = date % 30
        }
        if (date < 10) {
            date = "0" + date
        }
        banner_list.push({
            'id': i,
            date,
            'month': `${year}.${month}`,
            'title': Random.cparagraph(1, 10),
            'school': schools[Math.floor(Math.random() * 6)]
        })
    }
    if (i < 11) {
        focustoday_list.push({
            'id': i,
            'title': Random.cparagraph(1, 10),
            'author': schools[Math.floor(Math.random() * 6)],
            // 'authorimg': `https://source.unsplash.com/random/20x${20 + j++}`,
            'authorimg': `https://api.ixiaowai.cn/gqapi/gqapi.php?t=${j++}`,
        })
    }
    if (i < 5) {
        dynamic.push({
            'id': i,
            'title': Random.cparagraph(1, 10),
            // 'image': `https://source.unsplash.com/random/216x${144 + j++}`,
            'image': `https://api.ixiaowai.cn/gqapi/gqapi.php?t=${j++}`
        })
        let info_img = [],
            info_list = [];
        for (let k = 0; k < 6; k++) {
            info_img.push({
                'id': i,
                'title': Random.cparagraph(1, 10),
                // 'image': `https://source.unsplash.com/random/216x${144 + j++}`,
                'image': `https://api.ixiaowai.cn/gqapi/gqapi.php?t=${j++}`,
                'authorimg': `https://api.ixiaowai.cn/gqapi/gqapi.php?t=${j++}`,
                // 'authorimg': `https://source.unsplash.com/random/20x${20 + j++}`,
                'author': schools[Math.floor(Math.random() * 6)],
                'time': `${k}分钟前`
            })
        }
        for (let k = 0; k < 7; k++) {
            info_list.push({
                'id': i,
                'title': Random.cparagraph(1, 10),
                // 'authorimg': `https://source.unsplash.com/random/20x${20 + j++}`,
                'authorimg': `https://api.ixiaowai.cn/gqapi/gqapi.php?t=${j++}`,
                'author': schools[Math.floor(Math.random() * 6)]
            })
        }
        info.push({
            name: info_title[i].name,
            src: info_title[i].src,
            info_img,
            info_list
        })
    }
    if (i < 12) {
        video_list1.push({
            'id': i,
            // 'image': `https://source.unsplash.com/random/270x${180 + j++}`,
            'image': `https://api.ixiaowai.cn/gqapi/gqapi.php?t=${j++}`,
            'title': Random.cparagraph(1),
            'view': Random.integer(0, 10000),
            'zan': Random.integer(0, 10000),
            'src': 'video.html'
        })
    }
    if (i < 9) {
        video_list2.push({
            'id': i,
            // 'image': `https://source.unsplash.com/random/270x${180 + j++}`,
            'image': `https://api.ixiaowai.cn/gqapi/gqapi.php?t=${j++}`,
            'title': Random.cparagraph(1),
            'view': Random.integer(0, 10000),
            'zan': Random.integer(0, 10000),
            'src': 'video.html'
        })
    }
    if (i < 9) {
        if (i < 8) {
            hot_school[i] = ({
                title: hot_title[i],
                children: []
            })
            for (let kkk = 0; kkk < 4; kkk++) {
                hot_school[i].children.push({
                    schoolname: "人大附中中外合作办学项目",
                    // images: `https://source.unsplash.com/random/300x${200 + j++}`,
                    'image': `https://api.ixiaowai.cn/gqapi/gqapi.php?t=${j++}`,
                    label: class_table,
                    // school_logo: `https://source.unsplash.com/random/200x${50 + j++}`,
                    'school_logo': `https://api.ixiaowai.cn/gqapi/gqapi.php?t=${j++}`
                })
            }
        } else {
            hot_school.push({
                title: hot_title[i]
            })
        }
    }
}
let data = {
    banner,
    hours24,
    video,
    video2,
    banner_list,
    focustoday,
    focustoday_list,
    dynamic,
    hot_school,
    info,
    video_list1,
    video_list2,
    video_detail
}
module.exports = data;