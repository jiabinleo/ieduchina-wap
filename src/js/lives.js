import "../css/lives.less";

/* webpackjs */
const lives = {
    init(){
        this.banner();
    },
    banner(){
        new Swiper('.banner', {
            autoplay: true,
            loop:true,
            pagination: {
                el: '.swiper-banner-pagination',
              },
        })
    }
}

$(function(){
    lives.init();
})
/* webpackjs */