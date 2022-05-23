import "../css/schoollist.less";

const schoollist = {
    init() {
        this.menu();
        this.loadschool();
    },
    menu(){
        $(".headerwrap").on("click","menu span",function(){
            if($(this).hasClass("active")){
                $(this).removeClass("active");
                $(".menu-mask").hide();
                $(".headerwrap").find(".menu").eq($(this).index()).removeClass("active");
            }else{
                $(this).addClass("active").siblings().removeClass("active");
                $(".headerwrap").find(".menu").eq($(this).index()).addClass("active").siblings().removeClass("active");
                $(".menu-mask").show();
            }
        })
        $(".headerwrap").on("click",".links a",function(){
            $(this).addClass("active").siblings("a").removeClass("active");
        })
        $(".menu-mask").on("click",function(){
            $(".menu-mask").hide();
            $(".headerwrap").find(".menu").removeClass("active");
            $("menu span").removeClass("active");
        })
    },
    loadschool(){
        let page=1;
        $(document).on("click",".more-school a",function(){
            let ul = $(this).closest(".schoollist-list").find("ul");
            $.ajax({
                url:"list",
                type:"get",
                dataType:"html",
                data:{page},
                success(res){
                    if(res){
                        page+=1
                    }
                },
                error(err){
                    let li = `<li><div class="top"><a href="javascript:"><div class="schoollog"><img src="https://www.ieduchina.com/uploadfile/college/202012/1607653957.png" alt="北京师范大学附属实验中学国际部"></div><div class="price"><span>参考学费</span><p>12.8万~20.8万</p></div></a></div><div class="center"><a href="javascript:"><h3>上海高藤致远创新学校</h3><div class="text"><p>上海高藤致远创新学校位于浦东绿地国际教育园区，是与绿地香港股份有限公司（全球500强企业绿地集团控股子公司）战略合作上海高藤致远创新学校位于…</p></div></a><div class="tools"><a>2020人关注</a> <a>2020人咨询</a> <a>预约探校</a></div></div><div class="bottom"><a href="javascript:"><div class="image" style="background-image: url(https://www.ieduchina.com/uploadfile/202205/f46120220520145636.jpg);"></div><div class="text"><div class="title"><h4>深扒包玉刚：中国排名第一！据说马伊琍女儿就读该校！它凭什么这么牛？</h4></div><p>上海包玉刚实验学校</p></div></a></div></li>`
                    ul.append(li);
                }
            })
        })
    }
}

$(function(){
    schoollist.init();
})