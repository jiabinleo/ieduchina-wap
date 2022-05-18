import "../css/schoollistinfo.less";
// webpackjs
$(function () {
	if ($(".school-swiper-index").length) {
		var index = new Swiper('.school-swiper-index', {
			loop: true,
			autoplay: true,
			slidesPerView: 1,
			spaceBetween: 12,
			pagination: {
				el: '.swiper-index-pagination',
				clickable: true,
			}
		});
	}
	$(".school-swiper-menu").on("click", "a", function (even) {
		even.preventDefault()
	})
	if ($(".school-swiper-menu").length) {
		var index = new Swiper('.school-swiper-menu', {
			loop: false,
			autoplay: false,
			slidesPerView: 3,
			spaceBetween: 18,
			on: {
				click: function (e) {
					$(".content").css("max-height", 'initial')
					$(".showwrap").hide();
					$('html, body').animate({
						scrollTop: $('#' + $(e.target).text()).offset().top
					}, 500)
				}
			}
		});
	}
	var contentInitHeight = $(".content").height();
	function showmore() {
		if ($(".content-inner").height() + parseInt($(".content-inner h2").css("margin-top")) <= $(".content").height()) {
			$(".showwrap").hide();
		} else {
			var contentHeight = $(".content").height();
			$(".content").css("max-height", contentHeight + contentInitHeight);
			if ($(".content-inner").height() + parseInt($(".content-inner h2").css("margin-top")) <= $(".content").height()) {
				$(".showwrap").hide();
			}
		}
	}
	showmore()
	$(".school-more").on("click", function () {
		showmore()
	})

	$("textarea").on("keydown", function (e) {
		var $this = $(this);
		setTimeout(function () {
			var len = $this.val().length;
			len = len > 1000 ? 1000 : len;
			$this.siblings('span').text('文字' + len + '-1000字')
		}, 300)
	})

	var applyFlag = true;
	$(document).on("click", 'input[type="submit"]', function (e) {
		e = e || window.event
		e.preventDefault();
		var form = $(this).parents('form');
		var action = form.attr("action");
		var content = form.serialize();
		var result = false;
		var con = [];
		form.find('[name]').each(function () {
			result = check(this);
			if ($(this).attr("mark") && $(this).val()) {
				con.push(($(this).attr("mark") == "mark" ? '' : ($(this).attr("mark") + ":")) +
					$(this).val())
			}
			return result;
		});
		if (con.length) {
			content = content + '&mark=' + encodeURI(con.join('%%%'));
		}
		if (result && applyFlag) {
			applyFlag = false
			var url = action ? action : "/ajaxs/collegereg/?dopost=reg&t="
			$.ajax({
				url: url + Math.random(),
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
						$(".mask-jc").hide();
						form[0].reset();
						layer.open({
							content: '提交成功',
							skin: 'msg',
							time: 3
						});
					} else if (data.status == 0) {
						layer.open({
							content: data.info,
							skin: 'msg',
							time: 3
						});
					}
					applyFlag = true;
				},
				error: function () {
					applyFlag = true;
					layer.open({
						content: '提交失败，请稍后再试！',
						skin: 'msg',
						time: 3
					});
				}
			})
		}
	})
	// 验证表单
	var dataReg = {
		m: /^[1][0-9]{10}$/,
		e: /^[A-Za-z0-9-_\.]+\@([A-Za-z0-9-_]+\.)+[A-Za-z0-9]{2,6}$/
	}

	function check(element) {
		var datatype = $(element).attr('datatype');
		var value = $(element).val();
		if ($(element).attr("type") == "radio" && $(element).attr('nullmsg')) {
			var radiovalchecked = $("input[type='radio'][name='" + $(element).attr("name") + "']:checked").val()
			if (!radiovalchecked) {
				if (radiovalchecked == "") {
					layer.open({
						content: $("input[type='radio'][name='" + $(element).attr("name") + "']:checked").attr('nullmsg'),
						skin: 'msg',
						time: 3
					});
				} else {
					layer.open({
						content: $(element).attr('nullmsg'),
						skin: 'msg',
						time: 3
					});
				}

				return false;
			}
		} else if (!value && $(element).attr('nullmsg')) {
			layer.open({
				content: $(element).attr('nullmsg'),
				skin: 'msg',
				time: 3
			});
			return false;
		}else if(value && (value=="孩子就读省份" || value=="孩子就读城市") && $(element).attr('nullmsg')){
			layer.open({
				content: value,
				skin: 'msg',
				time: 3
			});
			return false;
		} else if (datatype && !dataReg[datatype].test(value)) {
			layer.open({
				content: $(element).attr('errormsg'),
				skin: 'msg',
				time: 3
			});
			return false;
		}
		return true;
	}

	$(document).on("click", ".jc", function () {
		$(".mask-jc").css("display", "flex");
	})

	$(document).on("click", ".close", function () {
		$(".masks").hide();
	})
	addressInit('provinceid', 'cityid', 'cmbArea2');
	$(document).on("click", ".formtk", function () {
		$(".mask-form").css("display", "flex");
	})
	$(document).on("click",".layui-m-layer",function(){
		$(this).remove();
	})
})
// webpackjs