declare let $:any;
$(function () { var path = "/skin/2022中秋教师节/", date = "20220909"; $("header .left img").attr("src", path + date + "menu_.png"); $(".right img").attr("src", path + date + "7.png"); $("header .search img").attr("src", path + date + "search_.png"); $(".swiper-menu").find("img").each(function (index, el) { $(el).attr("src", path + date + (index + 1) + ".png"); }); $("head").append('<style type="text/css">h1{visibility: hidden;}.headernav .header{background-color:transparent;background-image:url(' + path + 'wapbg' + date + '.png);background-position:center top;background-size:16rem 7.89rem;border-bottom:rgba(255,255,255,0) solid .04266667rem;}.headernav .topmenu{background-image:url(' + path + 'wapbg' + date + '.png);background-color:transparent;background-position:center -1.88rem;background-size:16rem 7.89rem;}.section .banner{background-image:url(' + path + 'wapbg' + date + '.png);background-color:transparent;background-position:center -3.64rem;background-size:16rem 7.89rem;background-repeat:no-repeat;}body .section .menu .swiper-menu .swiper-menu-pagination.swiper-pagination-progressbar .swiper-pagination-progressbar-fill{background:#0d2e87;}.section .banner .banner-bg{background-image:url(' + path + 'wapbg' + date + '.png);background-color:transparent;background-position:center -3.64rem;background-size:16rem 7.89rem;}.section .banner .swiper-index .swiper-wrapper .swiper-slide div{background-color:white}.section .menu .swiper-menu .swiper-menu-pagination .swiper-pagination-bullet.swiper-pagination-bullet-active{background-color:transparent}.section .menu .swiper-menu .swiper-menu-pagination .swiper-pagination-bullet{opacity:.6}.headernav .topmenu ul li a{color:#FFFFFF} .headernav .topmenu ul li.active::before{background-color:#FFFFFF}</style>') })