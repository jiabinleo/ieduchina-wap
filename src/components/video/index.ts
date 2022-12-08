import "./index.less";
declare let $:any;
declare let TCPlayer:any;
declare let layui:any;
export default $(function () {
    function videolist() {
        let pagesize = 0
        let noMore = false;
        function throttle(func, wait, mustRun) {
            let timeout,
                startTime = new Date();
            return function () {
                let context = this,
                    args = arguments,
                    curTime = new Date();
                clearTimeout(timeout);
                if (+curTime - +startTime >= mustRun) {
                    func.apply(context, args);
                    startTime = curTime;
                } else {
                    timeout = setTimeout(func, wait);
                }
            };
        }
        let scrollHeight = () =>
            document.body.scrollHeight || document.documentElement.scrollHeight;
        let keshiHeight = () =>
            window.innerHeight ||
            document.documentElement.clientHeight ||
            document.body.clientHeight;

        let scrollTopHeight = () =>
            Math.ceil(document.body.scrollTop || document.documentElement.scrollTop);

        window.onscroll = throttle(
            () => {
                if (scrollHeight() - 200 <= keshiHeight() + scrollTopHeight()) {
                    if (!noMore) {
                        getDataFn(pagesize);
                    }
                }
            },
            300,
            300
        );
        function getDataFn(pagesize) {
            console.log(pagesize)
            $.ajax({
                url: "js/video_list.json",
                type: "GET",
                success(res) {
                    if (res.status == 1 && res.data && res.data.length) {
                        let data = res.data;
                        pagesize++;
                        data.forEach((el, index) => {
                            let li = `<li>
                                <a href="${el.src}">
                                    <img loading="lazy" class="${el.type ? 'w' : ''}" src="${el.image}" alt="">
                                    <p>${el.title}</p>
                                    <div class="tool">
                                        <span><i></i>${el.view}</span>
                                        <span><i></i>${el.zan}</span>
                                    </div>
                                </a>
                            </li>`
                            $(".uls").append(li)
                        })
                        Full();
                    } else {
                        noMore = true;
                    }
                }, error(err) {
                    console.log(err)
                }
            })
        }
        window.onload = function () {
            Full();
        }
        window.onresize = function () {
            Full();
        }
        function Full() {
            var div = $(".uls").find("li");
            var pw = document.documentElement.offsetWidth - 12;
            var dw = div[0].offsetWidth;
            var cols = Math.floor(pw / dw);
            var white = (pw - dw * cols) / (cols + 1);
            var t = 10;
            var arr = [];
            for (var i = 0; i < cols; i++) {
                var pos = {
                    x: Math.floor((i + 1) * white + dw * i),
                    y: t
                }
                arr.push(pos);
            }
            for (var j = 0; j < div.length; j++) {
                var index = getMinTop(arr);
                div[j].style.left = arr[index].x + "px";
                div[j].style.top = arr[index].y + "px";
                arr[index].y += div[j].offsetHeight + t;
                if (j == div.length - 1) {
                    $(".uls").height(arr[index]['y'] + div[j].offsetHeight)
                }
            }
            $(".uls").css("visibility", "initial")
        }
        function getMinTop(arr) {
            var minT = arr[0].y;
            var index = 0;
            for (var k = 0; k < arr.length; k++) {
                if (arr[k].y < minT) {
                    minT = arr[k].y;
                    index = k;
                }
            }
            return index;
        }
    }
    if ($(".uls").length) {
        videolist()
    }

    try {
        TCPlayer('player-container-id', {});
        // player.src(url); // url 播放地址
    } catch (error) {
        console.warn(error)
    }
    $(".videos").on("click", ".thumbs", function () {
        let flag = $(this).hasClass("active");
        if (flag) {
            $(this).removeClass("active")
        } else {
            $(this).addClass("active")
        }
    })
    $(".videos .box").on("click", "button", function () {
        let flag = $(this).hasClass("active");
        if (flag) {
            $(this).removeClass("active")
            $(this).html("<i></i>关注")
        } else {
            $(this).addClass("active")
            $(this).html("已关注")
        }
    })
    $(document).on("click", "a.return", function () {
        window.history.go(-1);
    })
    console.log("debugger")
    layui.use(['form', 'layer'], function () {
        var form = layui.form,
            layer = layui.layer;
        form.verify({
            name: function (value) {
                if (!value) {
                    return '请输入姓名';
                }
            },
            want_school: function (value) {
                if (!value) {
                    return '请输入意向学校';
                }
            },
            mobile: function (value) {
                if (!value) {
                    return '请输入手机号';
                }
                if (!/^[1][0-9]{10}$/.test(value)) {
                    return "手机号格式不正确";
                }
            },
            code: function (value) {
                if (!value) {
                    return '请输入验证码';
                }
            }
        })
        form.on('submit(pub_form)', function (data) {
            console.log(data)
            $.ajax({
                url: data.form.action,
                type: data.form.method,
                dataType: "json",
                data: data.field,
                success: function (res) {
                    console.log(res)
                    if (res.data == 1) {
                        layer.msg('数据提交成功', {
                            icon: 1,
                            time: 2000
                        });
                        $("form.layui-form")[0].reset()
                    } else {
                        layer.msg(res.info, {
                            icon: 2,
                            anim: 6,
                            time: 2000
                        });
                    }
                },
                error: function (err) {
                    layer.msg("数据提交失败，请稍后再试")
                }
            })
            return false;
        });
        var countdown = 60;
        var timer = 60;
        $(".videos").on("click", '.getcode', function () {
            var $this = $(this);
            var text = $this.text();
            var phone = $(this).closest("form").find("input[name='mobile']").val()
            if (countdown == 60) {
                if (!$.trim(phone).length) {
                    layer.msg('请输入手机号', {
                        icon: 2,
                        anim: 6,
                        time: 2000
                    });
                    return false;
                }
                if (!/^[1][0-9]{10}$/.test(phone)) {
                    layer.msg('手机号格式不正确', {
                        icon: 2,
                        anim: 6,
                        time: 2000
                    });
                    return false;
                }
                var content = {
                    mobile: phone,
                }

                $.ajax({
                    url: "/api.php?op=school&do=sendmobilecode&t=" + Math.random(),
                    type: 'POST',
                    dataType: 'json',
                    data: content,
                    success: function (data) {
                        if (data == "1") {
                            layer.msg('验证码发送成功，请查看手机', {
                                icon: 1,
                                time: 2000
                            });
                            $this.text(countdown + ' s').attr('disabled', "true");
                            countdown--;
                            timer = setInterval(function () {
                                if (countdown > 0) {
                                    $this.text(countdown + ' s');
                                    countdown--;
                                } else {
                                    $this.text(text).removeAttr('disabled');
                                    clearInterval(timer);
                                    countdown = 60;
                                }
                            }, 1000)
                        } else {
                            layer.msg(data.info, {
                                icon: 2,
                                anim: 6,
                                time: 2000
                            });

                        }
                    },
                    error: function () {
                        layer.msg('验证码发送失败', {
                            icon: 2,
                            anim: 6,
                            time: 2000
                        });
                    }
                })
                return false;
            }
        })
    })
})