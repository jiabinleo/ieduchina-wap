import "@plugins/reset.less";
import "./index.less";
declare let layui:any;
layui.use(['form', 'jquery', 'layer'], function () {
    var $ = layui.jquery, form = layui.form, layer = layui.layer;
    form.verify({
        name: function (value) {
            if (!value) {
                return "请输入姓名";
            }
        },
        mobile: function (value) {
            if (!value) {
                return "请输入电话";
            }
        },
        grade: function (value) {
            if (!value) {
                return "请选择年级";
            }
        }
    });
    form.on("submit(submit)", function (value) {
        $.ajax({
            url: value.form.action + "&t=" + Math.random(),
            type: value.form.method,
            dataType: "JSON",
            data: value.field,
            success: function (res) {
                if (res.status == 1) {
                    layer.msg("提交成功", { icon: 1 })
                    window.location.href = "https://dtj.xet.tech/s/1jj34B"
                } else {
                    layer.msg(res.info, { icon: 2 })
                }
            },
            error: function () {
                layer.msg("数据提交失败", { icon: 2 })
            }
        })
        return false;
    })
    var winHeight = $(window).height();
    $(window).resize(function () {
        var thisHeight = $(this).height();
        if (winHeight - thisHeight > 140) {
            $('button[type=submit]').css({ 'position': 'absolut', 'bottom': '-50vh' });
        } else {
            $('button[type=submit]').css({ 'position': 'fixed', 'bottom': '0' });
        }
    })
});