import "../css/schoollist.less";

const schoollist = {
    init() {
        this.menu();
        this.loadschool();
        this.form();
        this.kefu();
        setInterval(() => {
            // window.location.href = window.location.href 
        }, 1000)
    },
    form() {
        $(document).on("click", ".close", function () {
            $(".masks").hide();
        })
        $(".menu-con .menu.s").find(".title").on("click", function () {
            if ($(this).hasClass("show")) {
                $(this).removeClass("show");
            } else {
                $(this).addClass("show").siblings(".title").removeClass("show");
            }
        })
        addressInit('provinceid', 'cityid', 'cmbArea2');
        $(document).on("click", ".formtk", function () {
            let schoolname = $(this).closest("li").find("h3").attr("title");
            $("input[type=hidden][name=school]").val(schoolname)
            $(".mask-form").css("display", "flex");
        })
        var applyFlag = true;
        $(document).on("click", 'input[type="submit"]', function (e) {
            e = e || window.event
            e.preventDefault();
            var form = $(this).parents('form');
            var action = form.attr("action");
            var content = form.serialize();
            var result = false;
            var con = [];
            form.find('[name]').each(function () {
                result = check(this);
                if ($(this).attr("mark") && $(this).val()) {
                    con.push(($(this).attr("mark") == "mark" ? '' : ($(this).attr("mark") + ":")) +
                        $(this).val())
                }
                return result;
            });
            if (con.length) {
                content = content + '&mark=' + encodeURI(con.join('%%%'));
            }
            if (result && applyFlag) {
                applyFlag = false
                var url = action ? action : "/ajaxs/collegereg/?dopost=reg&t="
                $.ajax({
                    url: url + Math.random(),
                    type: 'POST',
                    dataType: 'json',
                    data: content,
                    header: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                        'X-XXS-Protection': '1;mode=block',
                        'X-Frame-Options': 'deny'
                    },
                    success: function (data) {
                        if (data.status == 1) {
                            $(".mask-form").hide();
                            form[0].reset();
                            layer.open({
                                content: '提交成功',
                                skin: 'msg',
                                time: 3
                            });

                        } else if (data.status == 0) {
                            layer.open({
                                content: data.info,
                                skin: 'msg',
                                time: 3
                            });
                        }
                        applyFlag = true;
                    },
                    error: function () {
                        applyFlag = true;
                        layer.open({
                            content: '提交失败，请稍后再试！',
                            skin: 'msg',
                            time: 3
                        });
                    }
                })
            }
        })
        // 验证表单
        var dataReg = {
            m: /^[1][0-9]{10}$/,
            e: /^[A-Za-z0-9-_\.]+\@([A-Za-z0-9-_]+\.)+[A-Za-z0-9]{2,6}$/
        }

        function check(element) {
            var datatype = $(element).attr('datatype');
            var value = $(element).val();
            if ($(element).attr("type") == "radio" && $(element).attr('nullmsg')) {
                var radiovalchecked = $("input[type='radio'][name='" + $(element).attr("name") + "']:checked").val()
                if (!radiovalchecked) {
                    if (radiovalchecked == "") {
                        layer.open({
                            content: $("input[type='radio'][name='" + $(element).attr("name") + "']:checked").attr('nullmsg'),
                            skin: 'msg',
                            time: 3
                        });
                    } else {
                        layer.open({
                            content: $(element).attr('nullmsg'),
                            skin: 'msg',
                            time: 3
                        });
                    }

                    return false;
                }
            } else if (!value && $(element).attr('nullmsg')) {
                layer.open({
                    content: $(element).attr('nullmsg'),
                    skin: 'msg',
                    time: 3
                });
                return false;
            } else if (value && (value == "孩子就读省份" || value == "孩子就读城市") && $(element).attr('nullmsg')) {
                layer.open({
                    content: value,
                    skin: 'msg',
                    time: 3
                });
                return false;
            } else if (datatype && !dataReg[datatype].test(value)) {
                layer.open({
                    content: $(element).attr('errormsg'),
                    skin: 'msg',
                    time: 3
                });
                return false;
            }
            return true;
        }
    },
    menu() {
        $(".headerwrap").on("click", "menu span", function () {
            if ($(this).hasClass("active")) {
                $(this).removeClass("active");
                $(".menu-mask").hide();
                $(".headerwrap").find(".menu").eq($(this).index()).removeClass("active");
            } else {
                $(this).addClass("active").siblings().removeClass("active");
                $(".headerwrap").find(".menu").eq($(this).index()).addClass("active").siblings().removeClass("active");
                $(".menu-mask").show();
            }
        })
        $(".headerwrap").on("click", ".links a", function () {
            $(this).addClass("active").siblings("a").removeClass("active");
        })
        $(".menu-mask").on("click", function () {
            $(".menu-mask").hide();
            $(".headerwrap").find(".menu").removeClass("active");
            $("menu span").removeClass("active");
        })
    },
    loadschool() {
        let page = 1;
        $(document).on("click", ".more-school a", function () {
            let ul = $(this).closest(".schoollist-list").find("ul");
            $.ajax({
                url: "list",
                type: "get",
                dataType: "html",
                data: { page },
                success(res) {
                    if (res) {
                        page += 1
                    }
                },
                error() {
                    let li = `<li>
                    <div class="top">
                        <div class="schoollog">
                           <a href="javascript:"><img src="https://www.ieduchina.com/uploadfile/college/202012/1607653957.png"
                            alt="北京师范大学附属实验中学国际部"></a>
                        </div>
                        <div class="tools">
                            <a>2020人关注</a>
                            <a class="formtk">预约探校</a>
                        </div>
                    </div>
                    <div class="center">
                        <a href="javascript:">
                            <h3 title="上海高藤致远创新学校">上海高藤致远创新学校学校上海高藤致远创新学校上海高藤致远创新学校</h3>
                            <div class="text">
                                <p>上海高藤致远创新学校位于浦东绿地国际教育园区，是与绿地香港股份有限公司（全球500强企业绿地集团控股子公司）战略合作上海高藤致远创新学校位海高藤致远创新学校位于浦东绿地国际教育园区，是与绿地香港股份有限公司（全球500强企业绿地集团控股子公司）战略合作上海高藤致远创新学校位海高藤致远创新学校位于浦东绿地国际教育园区，是与绿地香港股份有限公司（全球500强企业绿地集团控股子公司）战略合作上海高藤致远创新学校位</p>
                            </div>
                        </a>
                        </div>
                        <div class="bottom">
                            <a href="javascript:">
                                <div class="text">
                                    <div class="title">
                                        <h4><i></i>深扒包玉刚：中国排名第一！据说马伊琍女儿就读该校！它凭什么这么牛？</h4>
                                    </div>
                                </div>
                            </a>
                        </div>
					</li>`
                    ul.append(li);
                }
            })
        })
    },
    kefu() {
        $(document).on("click", ".kefu", function () {
            window.location.href = "http://p.qiao.baidu.com/cps/chat?siteId=10762946&amp;userId=23739680"
        })
    }
}

$(function () {
    schoollist.init();
})