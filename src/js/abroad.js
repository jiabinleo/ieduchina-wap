import "../css/abroad.less";

const abroad = {
    init() {
        this.swiper();
        this.handleScroll();
    },
    swiper(){
        new Swiper('.banner', {
            autoplay: true,
            loop: true,
            pagination: {
                el: '.banner-pagination',
            },
        })
    },
    handleScroll(){
        $(window).scroll(function(){
            // scroll at bottom
            console.log($(window).scrollTop() + $(window).height())
            console.log($(document).height())
            if ($(window).scrollTop() + $(window).height() > ($(document).height()-120)) {
                $(".footer-tools").hide();
            }else{
                $(".footer-tools").show();
            }
        });
      }
}

$(function(){
    abroad.init();
})