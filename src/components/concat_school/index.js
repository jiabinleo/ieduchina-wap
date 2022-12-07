import "./index.less";

export default $(function () {
    layui.use(["form"], function () {
        let form = layui.form;
        form.verify({
            concat_name: function (value) {
                if (!value) {
                    return "请输入姓名"
                }
            },
            concat_grade: function (value) {
                if (!value) {
                    return "请选择年级"
                }
            },
            concat_provice: function (value) {
                if (!value) {
                    return "请选择省份"
                }
            },
            concat_city: function (value) {
                if (!value) {
                    return "请选择城市"
                }
            },
            concat_mobile: function (value) {
                if (!value) {
                    return "请输入手机号"
                }
            }
        })
        form.on("submit(concat_submit)", function (result) {
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
                }, error(err) {
                    layer.msg("提交失败", { icon: 2 })

                }
            })
            return false;
        })
        function success(phone, result) {
            result.form.reset();
            layui.form.render();
            $(".concat_school").find(".btn a").attr("href", `tel:${phone}`);
            $(".concat_school").find(".btn button").addClass("s").html("<i></i>提交成功");
        }
        address("concat_provice", "concat_city")
    })
})