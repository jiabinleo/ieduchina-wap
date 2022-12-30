import "./index.less";
declare let $: any;
declare let layui: any;
export default $(function () {
    layui.use(['form', 'layer'], function () {
        let form = layui.form,
            layer = layui.layer,
            timeoutTimer: any = null;
        form.verify({
            concat_name: function (value: string) {
                if (!value) {
                    return "请输入姓名"
                }
            },
            concat_grade: function (value: string) {
                if (!value) {
                    return "请选择年级"
                }
            },
            concat_mobile: function (value: string) {
                if (!value) {
                    return "请输入手机号"
                }
            },
            concat_yzm: function (value: string) {
                value = value.trim()
                if (!value) {
                    return '请输入验证码';
                }
            },
        })
        timeoutTimer = setTimeout(() => {
            if ($("#concat_school2").length) {
                layer.open({
                    type: 1,
                    title: false,
                    closeBtn: 2,
                    shadeClose: true,
                    shade: 0.5,
                    skin: 'concat-school2',
                    content: $("#concat_school2")
                });
            }
        }, 5000);
        form.on("submit(concat_submit)", function (result: any) {
            $.ajax({
                url: result.form.action,
                type: result.form.method,
                data: result.field,
                dataType: "json",
                success(res) {
                    if (res.status == 1) {
                        success("1231231231", result)
                    } else {
                        layer.msg(res.info, { icon: 2 })
                    }
                }, error() {
                    layer.msg("提交失败", { icon: 2 })
                    success("1231231231", result)
                }
            })
            return false;
        })
        function success(phone: string, result: any) {
            result.form.reset();
            layui.form.render();
            $(".concat_school").find(".btn a").attr("href", `tel:${phone}`);
            $(".concat_school").find(".btn button").addClass("s").html("<i></i>注册成功");
        }
        $(".concat").click(function () {
            clearTimeout(timeoutTimer);
            if(!$(this).hasClass('tel')){
                $('html, body').animate({
                    scrollTop: $(".concat_school2").offset().top - 200
                }, 300);
            }
        })
        $(document).on("click", ".layui-layer-msg", function () {
            $(this).hide();
        })
        getCode();
        function getCode() {
            var countdown = 60,
                initTime = 60,
                timer: any = null;
            $(".get_concat_code").click(function () {
                var $this = $(this);
                var text = $(this).text();
                let flag = true;
                var phone = $(this).closest("form").find("input[name='mobile']").val();
                if (!phone) {
                    layer.msg("请输入手机号码", { icon: 2, anim: 6 });
                    flag = false;
                } else if ((phone && !/^[1][0-9]{10}$/.test(phone))) {
                    layer.msg("手机号格式不正确", { icon: 2, anim: 6 });
                    flag = false;
                } else if (countdown == initTime) {
                    var successmsg = '验证码发送成功，请查看手机';
                    $this.text('发送中...').attr('disabled', "true");
                    $.ajax({
                        url: '/api.php?op=school&do=sendmobilecode&t=' + Math.random(),
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            mobile: phone
                        },
                        header: {
                            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                            'X-XXS-Protection': '1;mode=block',
                            'X-Frame-Options': 'deny'
                        },
                        success: function (data: number) {
                            if (data == 1) {
                                layer.msg(successmsg, { icon: 1 });
                                $this.attr('disabled', "disabled").text(countdown + ' s');
                                countdown--;
                                timer = setInterval(function () {
                                    if (countdown > 0) {
                                        $this.text(countdown + ' s');
                                        countdown--;
                                    } else {
                                        $this.removeAttr('disabled').text(text);
                                        clearInterval(timer);
                                        countdown = initTime;
                                    }
                                }, 1000)
                            } else {
                                layer.msg("验证码发送失败,请稍后再试", { icon: 2 });
                                $this.text(text).removeAttr('disabled');
                            }
                        },
                        error: function () {
                            layer.msg("验证码发送失败,请稍后再试", { icon: 2 });
                            $this.removeAttr('disabled').text(text);
                        }
                    })
                }
                return flag
            });
        }
    })
})