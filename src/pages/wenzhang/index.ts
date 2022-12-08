import "./index.less";
import "./components/concat_school/index.ts";
declare let $:any;
/*webpackjs*/
var el = null;
searchschool();
    function searchschool(){
        var timer = null;
        $(document).keyup("#want_school", function (e) {
            clearTimeout(timer);
            timer = setTimeout(function () {
                el = $(e.srcElement);
                var keyword = el.val().trim();
                if (keyword) {
                    $.ajax({
                        url: "/index.php?m=content&c=ajax&a=keyschool&t="+Math.random(),
                        type: "get",
                        dataType: "html",
                        data: {
                            name: keyword
                        },
                        success: function success(res) {
                            res = `<ul><li>上海纽约大学</li><li>WLSA上海学校</li><li>上海英国外籍人员子女学校浦西校区</li><li>上海宋庆龄学校国际部</li><li>上海澳大利亚国际学校</li><li>上海应用技术大学国际教育中心亚洲学士桥</li><li>上海诺美学校</li><li>上海加拿大国际中学</li><li>上海新加坡国际学校</li><li>上海耀中外籍人员子女学校</li><li>上海教科实验中学国际教育融合部</li><li>上海惠灵顿国际学校</li><li>上海燎原双语学校-国际课程</li><li>上海万科双语学校</li><li>上海新虹桥中学</li><li>上海博华美国高中</li><li>上海英国外籍人员子女学校浦东校区</li></ul>`
                            $(".searchschool").find("ul").remove();
                            if(res){
                                $(".searchschool").append(res);
                            }
                        },
                        error: function error() {
                            let res = `<ul><li>上海纽约大学</li><li>WLSA上海学校</li><li>上海英国外籍人员子女学校浦西校区</li><li>上海宋庆龄学校国际部</li><li>上海澳大利亚国际学校</li><li>上海应用技术大学国际教育中心亚洲学士桥</li><li>上海诺美学校</li><li>上海加拿大国际中学</li><li>上海新加坡国际学校</li><li>上海耀中外籍人员子女学校</li><li>上海教科实验中学国际教育融合部</li><li>上海惠灵顿国际学校</li><li>上海燎原双语学校-国际课程</li><li>上海万科双语学校</li><li>上海新虹桥中学</li><li>上海博华美国高中</li><li>上海英国外籍人员子女学校浦东校区</li></ul>`
                            $(".searchschool").find("ul").remove();
                            if(res){
                                $(".searchschool").append(res);
                            }
                        }
                    });
                } else {
                }
            }, 400);
        });
        $(document).on("click", function (e) {
            try {
                var list = $(el).parent()[0]
                if (e.target !== list && !$.contains(list, e.target)) {
                    $(".searchschool").find("ul").hide();
                } else {
                    if ($(e.target).attr("type") == "text") {
                        var ul = $(e.target).siblings(".searchschool").find("ul");
                        if (ul.find("li").length) {
                            ul.show();
                        }
                    } else {
                        $("#want_school")
                        $(e.target).closest(".searchschool").siblings("input[type='text'][name='want_school']").val($(e.target).text());
                        $(e.target).closest(".searchschool").find("ul").hide();
                    }
                }
            } catch (error) {
                
            }
        });
    }
/*webpackjs*/