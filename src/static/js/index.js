$(function () {
    $(window).on('scroll', function (e) {
        if ($('.header').offset().top - $(window).scrollTop() < 1) {
            $('.header').css({
                position: 'fixed'
            })
            $('.topmenu').css({
                marginTop: $(".header").innerHeight()
            })
        } else {
            $('.header').css({
                position: 'relative'
            })
        }
        if ($('.topmenu').offset().top - $(window).scrollTop() > $(".header").innerHeight()) {
            $('.header').css({
                position: 'relative'
            })
            $('.topmenu').css({
                marginTop: 0
            })
        }
    })

    var index = new Swiper('.swiper-index', {
        loop: true,
        autoplay: true,
        slidesPerView: 1,
        spaceBetween: 12,
        pagination: {
            el: '.swiper-index-pagination',
            clickable: true,
        }
    });

    var menu = new Swiper('.swiper-menu', {
        loop: false,
        autoplay: false,
        slidesPerView: 5,
        spaceBetween: 25,
        pagination: {
            el: '.swiper-menu-pagination',
            clickable: true,
			type:'progressbar'
        }
    })

    var resources = new Swiper('.swiper-resources', {
        loop: false,
        autoplay: false,
        slidesPerView: 1.27,
        spaceBetween: 20
    })

    $("#menu").on("click", function () {
        $('html, body').animate({
            scrollTop: Math.ceil($('.header').offset().top)
        }, 300);
        if ($(".index-menu-wrap").height() == 0) {
            $(".index-menu-wrap").animate({
                height: "100vh"
            });
        }
        return false;
    })

    $(document).on("click", ".close-menu", function (e) {
        if ($(".index-menu-wrap").height()) {
            $(".index-menu-wrap").animate({
                height: 0
            });
        }
        return false;
    })

    //头部搜索[文章/院校]切换
    $("#searchContent").on("click", function () {
        $(".submenu").show()
    })
    $(".search-hover").on("click", ".submenu p", function () {
        $("#searchContent").text($(this).text())
        $("#searchid").val($(this).attr("value"))
        $(".search-hover").find(".submenu").hide();
    })

    $(document).on("click", function (e) {
        var con = $('#searchContent');
        if (!con.is(e.target) && con.has(e.target).length === 0) {
            $(".submenu").hide()
        }
    })
    //头部-搜索
    $("#searchbtn").on("click", function () {
        var txt = $("#headerInput").val().replace(/(^\s*)|(\s*$)/g, '');
        var searchid = $("#searchid").val();
        if (txt == "输入搜索内容" || txt == "请输入搜索内容" || txt == "") {
            return false;
        }
        console.log(searchid)
        console.log(txt)
        if (searchid == 1) {
            var url = "//schoollist.ieduchina.com/?searchkey=" + txt;
        } else {
            var url = "//www.ieduchina.com/search/" + txt + ".html?searchid=2";
        }
        if ($("#search_catid").length > 0) {
            var catid = $("#search_catid").val();
            if (catid == 1) {
                var url = "//schoollist.ieduchina.com/schlist/c1/?searchkey=" + txt;
            }
        }
        window.location.href = url;
        return false;
    });
    $("#headerInput").on("click", function () {
        var txt = $("#headerInput").val().replace(/(^\s*)|(\s*$)/g, '');
        if (txt == "输入搜索内容" || txt == "请输入搜索内容" || txt == "") {
            $("#headerInput").attr('value', '');
        }
    });

    // 加载更多
    $(document).on("click", "#clickmore", function () {
        var len = $("#school-list > li.hide").length
        if (len < 10) {
            $(".clickmore").hide()
        }
        var maxl = len > 10 ? 10 : len
        if (len) {
            for (let i = 0; i < maxl; i++) {
                $("#school-list > li.hide").eq(0).removeClass("hide");
            }
        }
        len = $("#school-list > li.hide").length
    })
})