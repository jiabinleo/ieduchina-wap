import "./index.less";
declare let $:any;
declare let Swiper:any;
declare let layer:any;
$(function(){
    // offer
    var mySwiper = new Swiper('.offer-swiper', {
        effect: 'coverflow',
        centeredSlides: true,
        slidesPerView: 1.96,
        autoplay: {
            disableOnInteraction: false
        },
        loop: true, // 循环模式选项
        loopAdditionalSlides: 100,
        spaceBetween: -10,
        coverflowEffect: {
            rotate: 0,
            stretch: 0,
            depth: 20,
            modifier: 20,
            slideShadows: false
        }
    })
    //qualification 
    var qualification = new Swiper('.zz-swiper', {
        slidesPerView: 3.7
    })
    new Swiper('.tab-title', {
        slidesPerView: "auto",
        on:{
            click: function(){
                $(".tab").find(".swiper-slide").eq(this.clickedIndex).addClass("active").siblings(".swiper-slide").removeClass("active");
                $(".tab").find(".tab-con").eq(this.clickedIndex).show().siblings('.tab-con').hide()
            },
        },
    })
    var serve = new Swiper('.serve-swiper', {
        slidesPerView: 1,
        pagination: {
        el: '.serve-swiper-pagination',
        }
    })
    var applyFlag = true;
    $(document).on("click", ".submit", function (e) {
        e = e || window.event
        e.preventDefault();
        var form = $(this).parents('form');
        var content = form.serialize();
        var error = form.find('.error-tips');
        error.html("");
        var btnTxt = $(this).html();
        var result = false;
        var self = this;
        var schoolarr = "";
        var subjectsarr = "";
        var comurl = window.location.href
        // want_school: (蛇口国际)(英语,面试,家长面试)
        // 提交前验证
        var con = [];
        form.find('input, select').each(function () {
            result = check(this);
            if ($(this).attr("mark") && $(this).val()) {
                con.push(($(this).attr("mark") == "mark" ? '' : ($(this).attr("mark") + ":")) +
                    $(this).val())
            }
            return result;
        });
        if (form.find('input[data-type="school"]').length != 0) {
            if (form.find('input[data-type="school"]:checked').length == 0) {
                error.html("请选择意向学校")
                return false
            } else {
                var school = form.find('input[data-type="school"]:checked')
                for (var i = 0; i < school.length; i++) {
                    schoolarr += school.eq(i).val() + ','
                }
            }
        }
        if (form.find('input[data-type="subjects"]').length != 0) {
            if (form.find('input[data-type="subjects"]:checked').length == 0) {
                error.html("请选择提升科目")
                return false
            } else {

                var subjects = form.find('input[data-type="subjects"]:checked')
                for (var i = 0; i < subjects.length; i++) {
                    subjectsarr += subjects.eq(i).val() + ','
                }
            }
        }
        var want_school = ""
        var reg = /,$/gi;
        if (schoolarr) {
            want_school += '(' + schoolarr.replace(reg, "") + ')'
        }
        if (subjectsarr) {
            want_school += '(' + subjectsarr.replace(reg, "") + ')'
        }
        if ($("input[name='other_school']").val()) {
            want_school += '(' + $("[name='other_school']").val() + ')'
        }
        if ($("input[name='other_subject']").val()) {
            want_school += '(' + $("[name='other_subject']").val() + ')'
        }
        if (want_school) {
            content = $.param({
                want_school: want_school
            }) + '&' + content
        }
        content = $.param({
            comurl: comurl
        }) + '&' + content
        if (con.length) {
            content = content + '&mark=' + encodeURI(con.join('%%%'));
        }
        if (result && applyFlag) {
            applyFlag = false
            $(self).html('提交中...');
            $.ajax({
                url: "/ajaxs/collegereg/?dopost=reg&t=" + Math.random(),
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
                        $(".mask").hide();
                        form[0].reset();
                        layer.open({
                            content: '您已预约成功，谢谢您的参与！',
                            skin: 'msg',
                            time: 3 //3秒后自动关闭
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
                        content: '预约失败，请稍后再试',
                        skin: 'msg',
                        time: 3 //3秒后自动关闭
                    });
                }
            })
        }

    }) // 验证表单
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

    $(document).on("click", ".close", function () {
        $(this).closest(".mask").hide();
        $(this).closest('form')[0].reset();
    })
    $(document).on("click", ".showtk", function () {
        var school_name = $(this).attr('school-name');
        if (school_name) {
            $(".mask").find("input[name='want_school']").val(school_name)
        }
        $(".mask").show();
    })
})