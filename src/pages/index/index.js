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
})

  
//   <%= require('@layouts/header.ejs')()%>
	
//     <%-- <img src="<%= require('@images/text.png') %>" alt="num"> %>
			
// 	<%= require('@layouts/scripts.ejs')()%>
// 	<!-- <%# if(process.env.appType=="MOBILE"){%>
// 	<script src="static/js/rem.js"></script>
// 	<%}%> -->