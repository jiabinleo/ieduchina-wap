$(function(){
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
		if($('.topmenu').length)
		{
			if ($('.topmenu').offset().top - $(window).scrollTop() > $(".header").innerHeight()) {
            $('.header').css({
                position: 'relative'
            })
            $('.topmenu').css({
                marginTop: 0
            })
			}	
		}
        
    })
    $("#menu").on("click", function () {
        $('html, body').animate({
            scrollTop: $('.header').offset().top
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
	//加入我们
	var mySwiper1 = new Swiper('.joinus_swiper', {
		effect: 'coverflow',
		centeredSlides: true,
		spaceBetween: -80,
		slidesPerView: 2,
		loop: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		autoplay: {
			disableOnInteraction: false,
		},
		coverflowEffect: {
			rotate: 0,
			stretch: 5.8,
			depth: 80,
			modifier: 3,
			slideShadows: true,
		}
	})

	$(".about-joinus-work").on("click",".detail",function(){
		var isDown = $(this).hasClass("top");
		if(isDown){
			$(this).removeClass("top")
			$(this).closest("li").find(".details").removeClass("border").animate({height:0},600)
		}else{
			$(this).addClass("top");
			var height = $(this).closest("li").find('.con').outerHeight();
			$(this).closest("li").find(".details").addClass("border").animate({height:height+'px'},600)
			$(this).closest("li").siblings("li").find(".details").removeClass("border").animate({height:0},600)
			$(this).closest("li").siblings("li").find(".detail").removeClass("top");
			
		}
   })
})