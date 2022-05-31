/*webpackjs*/
$(function () {
    $(document).keydown(function (event) {
        if (event.keyCode == 13) {
            searchKey()
        }
    });
    $(document).on("click", ".library-search-icon", function () {
        searchKey()
    })

    function searchKey() {
        var val = $.trim($("#librarySearch").val())
        if (val) {
            var url = "//m.ieduglobe.com/?searchkey=" + val;
            window.location.href = url;
        } else {
            layer.open({
                content: "请输入您想了解的学校",
                skin: 'msg',
                time: 3
            });
        }
    }

    //tab切换
    $(".search_nav ul li").click(function () {
        $(".search_nav ul .active").removeClass('active');
        var $index = $(this).index();
        var code = $('.list_container .fl_list').eq($index);
        var display = code.css('display');

        if (display == 'none') {
            $(this).addClass('active');
            $('.list_container .fl_list').hide();
            code.show();
            $(".letter_nav").hide();
        } else {
            $('.list_container .fl_list').hide();
            $(this).removeClass("active");
            code.hide();
            $(".letter_nav").show();
        }
    });

    //收起点击事件
    $(".fl_list h5").click(function () {
        $(this).parents('.fl_list').hide();
        $(".search_nav ul li.active").removeClass('active')
    });


    //字母搜索 
    $(".letter_nav li:not(:first)").click(function () {
        $(this).addClass("active").siblings().removeClass('active');

        var pinying = $(this).html();
        $("#pinying").attr("value", pinying);
        $("#school_list").html('');

        var url = "/index.php?m=iedum&c=index&a=json_list&catid=2&section=&province=16&city=17&searchkey=";
        $.post(url, {
                'page': 0,
                'pinying': pinying
            },
            function (result) {
                $(".lookMore").attr('data-page', result.page);
                if (result.showHtml) {
                    $("#school_list").append(result.showHtml);
                    $("#sem-school-list").html(result.semHtml);
                    $(".lookMore").show();
                } else {
                    $(".lookMore").hide();
                    $("#school_list").html('<div class="univer_content"><h3 class="search_noh3">暂无相关学校数据，请重新搜索</h3></div>');
                    $(".bgdee+.univer_content").css("padding-bottom", "13rem");
                }
            }, 'json');

    });

    //按省份选择城市
    $(".province_list li").click(function () {
        $(this).toggleClass('active');
        $(this).find(".city_list_fl ").toggle();
    });

    //判断城市列表个数，最后一行不足4个，加空加标签
    function appendLi(ul) {
        //最后一行个数
        var lastNum = $(ul).find("li").length % 4;
        var lihtml = "";
        if (lastNum == 0) {
            return;
        }
        for (var i = 0; i < 4 - lastNum; i++) {
            lihtml += "<li></li>";
        }
        $(ul).append(lihtml);
    }

    $(".province_list .city_list_fl").each(function () {
        appendLi(this);
    });

    appendLi(".city_list_dl:first .city_list_fl");


    //设置select默认值颜色
    var unSelected = "#666666";
    var selected = "#000000";
    $("select").css("color", unSelected);
    $("option").css("color", selected);
    $("select").change(function () {
        var selItem = $(this).val();
        if (selItem == $(this).find('option:first').val()) {
            $(this).css("color", unSelected);
        } else {
            if ($(this).hasClass("black")) {
                $(this).css("color", "#000000");
            } else {
                $(this).css("color", selected);
            }
        }
    });
    //关闭报名弹框
    $("#closebm").on("click", function () {
        $(".mask").animate({
            opacity: 0
        }, 300, function () {
            $(".mask").hide();
        })
        $(".error-tips").html("")
    })
    //点击报名按钮
    $(document).on("click", ".showtk", function () {
        var schoolname = $(this).parents(".list").find(".school-name").text()
        console.log(schoolname)
        $("#want_school").val(schoolname)
        if ($(this).hasClass("yy")) {
            $(".mask").find(".xhelse").hide();
            $(".mask").find(".else").removeAttr("nullmsg");
        } else if ($(this).hasClass("sq")) {
            $(".mask").find(".xhelse").show();
            $(".mask").find(".else").attr("nullmsg", "请输入你要咨询的问题");
        }
        $(".mask").show();
        $(".mask").animate({
            opacity: 1
        }, 300)
    })
    var applyFlag = true;
    //提交报名信息
    $(document).on("click", ".tk_sibmit", function (e) {
        e = e || window.event
        e.preventDefault();
        var form = $(this).parents('form');
        var error = form.find('.error-tips');
        error.html("");
        var btnTxt = $(this).html();
        var result = false;
        var self = this;

        var errormsg = $(this).attr("errormsg") || "预约失败，请稍后再试"
        var successmsg = $(this).attr("successmsg") || "您已预约成功，谢谢您的参与！"

        // 提交前验证
        var con = [];
        form.find('input, select,textarea').each(function (i) {
            result = check(this);
            if ($(this).attr("mark") && $(this).val()) {
                con.push(($(this).attr("mark") == "mark" ? '' : ($(this).attr("mark") + ":")) + $(this).val())
            }
            return result;
        });
        var content = form.serialize() + '&mark=' + encodeURI(con.join('%%%'));
        if (result && applyFlag) {
            applyFlag = false
            $(self).html('预约中...');
            $.ajax({
                url: "/index.php?m=content&c=ajax&a=collegereg&dopost=reg&t=" + Math.random(),
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
                        $(".mask").animate({
                            opacity: 0
                        }, 300, function () {
                            $(".mask").hide();
                        })
                        form[0].reset();
                        layer.open({
                            content: successmsg,
                            skin: 'msg',
                            time: 3
                        });
                    } else if (data.status == 0) {
                        error.html(data.info);
                    }
                    applyFlag = true;
                    $(self).html(btnTxt);
                },
                error: function () {
                    applyFlag = true;
                    $(self).html(btnTxt);
                    layer.open({
                        content: errormsg,
                        skin: 'msg',
                        time: 3
                    });
                }
            })
        }
    })
    // 验证表单
    var dataReg = {
        m: /^[1][0-9]{10}$/
    }

    function check(element) {
        var error = $(element).parents("form").find(".error-tips");
        var datatype = $(element).attr('datatype');
        var value = $(element).val();
        if (!value && $(element).attr('nullmsg')) {
            error.html($(element).attr('nullmsg'));
            $(element).addClass('error');
            return false;
        }
        if (datatype && !dataReg[datatype].test(value)) {
            error.html($(element).attr('errormsg'));
            $(element).addClass('error');
            return false;
        }
        error.html('');
        $(element).parents(".item").removeClass('error');
        return true;
    }

    $("body").on('blur', 'form input,form select,form textarea', function () {
        check(this);
    })

    var alldata = []
    $.ajax({
        url: "https://m.ieduglobe.com/statics/m/js/city.json",
        type: "get",
        success: function (res) {
            if (res.result === "1" && res.rows.length) {
                alldata = res.rows;
            }
        }
    })

    $(".address").on("click", function () {
        $(".pre").empty();
        $.each(alldata, function (index, item) {
            $(".pre").append(
                '<li provinceId = ' + index + '><span>' + item.provinceName + '</span></li>'
            )
        })
        $(".prew").css({
            width: '100%'
        });
        $(".cityw").css({
            width: 0
        });
        $(".preWrap").show();
    })
    $(document).on("click", ".pre li", function () {
        $(this).addClass("active").siblings().removeClass("active");
        $(".city").empty();
        var citydata = alldata[$(this).attr("provinceId")]
        $.each(citydata.cities, function (index, item) {
            $(".city").append(
                '<li provinceId = ' + index + '><span>' + item.cityName + '</span></li>'
            )
        })
        $(".prew").animate({
            width: "50%"
        }, 200)
        $(".cityw").animate({
            width: "50%"
        }, 200)
    })
    $(document).on("click", ".city li", function () {
        $(this).addClass("active").siblings().removeClass("active");
        var t1 = $(".pre").find("li.active").text();
        var t2 = $(".city").find("li.active").text();
        var adname = (t1 == t2) ? t1 : (t1 + ',' + t2)
        $(".address").html(adname);
        $(".addressinput").val((t1 == t2) ? t1 : (t1 + ',' + t2))
        $(".address").removeClass("msgnull");
        $(".preWrap").hide();
        $(".pre").empty();
        $(".city").empty();
        $(".prew").stop(true, true);
        $(".cityw").stop(true, true);
    })

    $(document).on("click", ".preWrap", function (e) {
        var con = $('.list');
        if (!con.is(e.target) && con.has(e.target).length === 0) {
            $(".address").removeClass("msgnull");
            $(".preWrap").hide();
            $(".pre").empty();
            $(".city").empty();
            $(".prew").stop(true, true);
            $(".cityw").stop(true, true);
        }
    })


    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }

    //滑屏加载
    var flag = true;
    var page = 1;
    $(document).on("scroll", function () {
        moreAjax();
    })
    function moreAjax() {
        var ajaxUrl=$("#ajaxUrl").val();
        var wTop = $(window).scrollTop();
        var wHeight = $(window).height();
        var dHeight = $(document).height();
        if (wTop + wHeight >= (dHeight - 500) && flag) {
            layer.open({
                type: 2,
                skin: 'loading'
            })
            page++
            flag = false;
            $.ajax({
                url: ajaxUrl+'&page='+page,
                type: 'get',
                dataType: 'json',
                header: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                    'X-XXS-Protection': '1;mode=block',
                    'X-Frame-Options': 'deny'
                },
                success: function (res) {
                    layer.closeAll();
                    if (res.status == 1 && res.data) {
                        $("#sem-school-list").append(res.data);
                        flag = true;
                    } else {
                        page--
                        layer.open({
                            content: '数据加载完成',
                            skin: 'msg',
                            time: 3
                        });
                    }
                },
                error: function (err) {
                    page--
                    layer.closeAll();
                    setTimeout(function () {
                        flag = true;
                    }, 10000);
                }
            })
        }
    }
})
/*webpackjs*/