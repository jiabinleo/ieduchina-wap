import "../css/abroad.less";

const abroad = {
    init() {
        this.swiper();
    },
    swiper(){
        new Swiper('.banner', {
            autoplay: true,
            loop: true,
            pagination: {
                el: '.banner-pagination',
            },
        })
    }
}

$(function(){
    abroad.init();
})