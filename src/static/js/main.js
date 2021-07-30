$(function () {
	$(window).on('scroll', function (e) {
		if(!$('.header').offset()){
			return false
		}
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
			type: 'progressbar'
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
			scrollTop: Math.ceil($('.headernav').offset().top + $("#wap_ad_top").height())
		}, 10);
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

	//登录页面
	var isMock = true; //模拟操作
	$(".login .tab").on("click", 'span', function () {
		$(this).removeClass("active").siblings().addClass("active");
		$(this).closest(".login").find(".content").eq($(this).index()).show().siblings(".content")
			.hide();
	})
	//表单提交
	var applyFlag = true;
	$(document).on("click", ".submit", function (e) {
		e = e || window.event
		e.preventDefault();
		var form = $(this).parents('form');
		var comurl = window.location.href;
		// var content = form.serialize();
		var error = form.find('.error-tips');
		error.html("");
		var btnTxt = $(this).html();
		var result = false;
		var self = this;
		var page = $(this).attr('topage')

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
		var content = form.serialize()
		if (con.length) {
			content = content + '&mark=' + encodeURI(con.join('%%%'));
		}

		if (result && applyFlag) {
			applyFlag = false
			var successmsg = $(this).attr("success") || '提交成功';
			var errormsg = $(this).attr("error") || '提交失败';
			$(self).html('预约中...');
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
						form[0].reset();
						layer.open({
							content: successmsg,
							skin: 'msg',
							time: 3
						});
					} else if (data.status == 0) {
						layer.open({
							content: successmsg,
							skin: 'msg',
							time: 3
						});
					}
					applyFlag = true;
					$(self).html(btnTxt);
				},
				error: function () {
					applyFlag = true;
					$(self).html(btnTxt);
					layer.open({
						content: errormsg,
						skin: 'msg',
						time: 3
					});
					// 模拟登陆成功
					if ($(self).attr("html")) {
						window.location = $(self).attr("html")
					}
					if (isMock) {
						window.open($(self).attr('href'), '_self')
					}
				}
			})
		}

	}) // 验证表单
	var dataReg = {
		m: /^[1][0-9]{10}$/,
		phone: /^[1][0-9]{10}$/,
		email: /^[A-Za-z0-9-_\.]+\@([A-Za-z0-9-_]+\.)+[A-Za-z0-9]{2,6}$/,
		passport: /^[a-zA-Z0-9]{6,18}$/
	}

	function check(element) {
		var error = $(element).parents("form").find(".error-tips");
		var datatype = $(element).attr('datatype');
		var value = $(element).val();
		var nullmsg = $(element).attr('nullmsg')
		if (!value && nullmsg) {
			error.html(nullmsg);
			$(element).addClass('error');
			layer.open({
				content: nullmsg,
				skin: 'msg',
				time: 3
			});
			return false;
		}
		if (datatype && !dataReg[datatype].test(value)) {
			error.html($(element).attr('errormsg'));
			$(element).addClass('error');
			layer.open({
				content: $(element).attr('errormsg'),
				skin: 'msg',
				time: 3
			});
			return false;
		}
		if ($(element).attr('mobileOrEmail') && !dataReg.phone.test(value) && !dataReg.email.test(value)) {
			layer.open({
				content: '请输入正确的手机号码或者邮箱',
				skin: 'msg',
				time: 3
			});
			return false;
		}
		error.html('');
		$(element).parents(".item").removeClass('error');
		return true;
	}

	// 发送验证码
	//发送验证码
	var countdown = 60,
		timer = null;
	$(".getCode").click(function () {
		var $this = $(this);
		var text = $(this).val();
		var phone = $(this).closest("form").find("input[name='phone']").val();
		if (!phone) {
			layer.open({
				content: '请输入手机号码',
				skin: 'msg',
				time: 3
			});
			return false;
		}
		if ((phone && !dataReg.phone.test(phone))) {
			layer.open({
				content: '手机号格式不正确',
				skin: 'msg',
				time: 3
			});
			return false;
		}
		if (countdown == 60) {
			successmsg = '验证码发送成功，请查看手机';
			$this.val('发送中...').attr('disabled', "true");
			$.ajax({
				url: '/api.php?op=school&do=sendmobilecode&t=' + Math.random(),
				type: 'POST',
				dataType: 'json',
				data: {
					phone: phone
				},
				header: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
					'X-XXS-Protection': '1;mode=block',
					'X-Frame-Options': 'deny'
				},
				success: function (data) {
					if (data == "1") {
						layer.open({
							content: successmsg,
							skin: 'msg',
							time: 3
						});
						$this.val(countdown + ' s').attr('disabled', "true");
						countdown--;
						timer = setInterval(function () {
							if (countdown > 0) {
								$this.val(countdown + ' s');
								countdown--;
							} else {
								$this.val(text).removeAttr('disabled');
								clearInterval(timer);
								countdown = 60;
							}
						}, 1000)
					} else {
						layer.open({
							content: '验证码发送失败,请稍后再试',
							skin: 'msg',
							time: 3
						});
						$this.val(text).removeAttr('disabled');
					}
				},
				error: function () {
					layer.open({
						content: '验证码发送失败,请稍后再试',
						skin: 'msg',
						time: 3
					});
					$this.val(text).removeAttr('disabled');
				}
			})
		}
	});
	$(document).on('click', '.back', function () {
		window.history.go(-1);
	})
	if ($("#addPhotoBtn1").length) {
		$("#addPhotoBtn1").on("click", function () {
			var btn = this;
			C3PhotoCrop.crop({
				cropSize: '188x188',
				title: '选择图片',
				language: 'cn',
				success: function (data) {
					var avatar = dataURLtoBlob('data:image/jpeg;base64,' + data.data)
					$(btn).siblings(".avatar-img").find('img').attr('src', URL
						.createObjectURL(avatar));
				}
			});
		})
	}

	function dataURLtoBlob(dataurl) {
		let arr = dataurl.split(',');
		let mime = arr[0].match(/:(.*?);/)[1];
		let bstr = atob(arr[1]);
		let n = bstr.length;
		let u8arr = new Uint8Array(n);
		while (n--) {
			u8arr[n] = bstr.charCodeAt(n);
		}
		return new Blob([u8arr], {
			type: mime
		});
	}
	$('#showPicker').on('click', function () {
		weui.picker([{
			label: '教育工作者',
			value: '教育工作者'
		}, {
			label: '学生',
			value: '学生'
		}, {
			label: '学生家长',
			value: '学生家长'
		}, {
			label: '其他',
			// disabled: true,
			value: '其他'
		}], {
			onChange: function (result) {
				// console.log(result);
			},
			onConfirm: function (result) {
				console.log(result[0].value)
				$('#showPicker p').text(result[0].value);
				$('#showPicker').siblings('input[type="hidden"]').val(result[0].value)
			},
			title: '选择身份',
			defaultValue: [$('#showPicker').siblings('input[type="hidden"]').val()]
		});
	});

	//创作中心文章、微头条切换
	var data = {
		'title': '文章',
		'type': '全部',
	}
	$(document).on("click", ".menu-data button", function (e) {
		$(".creative-menu").find("button").eq($(this).index()).addClass("active").siblings("button")
			.removeClass("active");
		data.type = $(e.target).text();
	})
	$(document).on("click", ".menu-data", function (e) {
		if ($(this).find("p").length) {
			data = {
				'title': $.trim($(e.target).text()),
				'type': '全部'
			}
			$(".creative-center-menu").find('li').eq($(this).index()).addClass("active").siblings("li")
				.removeClass("active");
			$(".creative-menu").find("button").eq(0).addClass("active").siblings("button").removeClass(
				"active");
		}
		console.log(data)
		if(data.title=="微头条"){
			$(".dynamic_list").find("ul.wtt").show().siblings("ul").hide();
		}else if(data.title=="文章"){
			$(".dynamic_list").find("ul.wz").show().siblings("ul").hide();
		}else if(data.title=="收藏"){
			$(".dynamic_list").find("ul.sc").show().siblings("ul").hide();
		}
		$.ajax({
			url: "/ajaxs/collegereg/?dopost=reg&t=" + Math.random(),
			type: 'POST',
			dataType: 'json',
			data: data,
			header: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
				'X-XXS-Protection': '1;mode=block',
				'X-Frame-Options': 'deny'
			},
			success: function (data) {
				
			},
			error: function () {
				
			}
		})
	})
	$(document).on("click", '.operation', function (e) {
		if($(this).find(".men").length){
			if($(this).find(".men").css('display')=='none'){
				$(this).find(".men").show();
				$(this).closest("li").siblings('li').find(".men").hide();
			}else{
				if($(e.target).attr("class")!=="nomodify"){
					$(this).find(".men").hide();
				}
			}
		}else{
			var $tool = $(this).closest(".lis").siblings('.tool')
			var flag = $tool.css("display") == 'none'
			if (flag) {
				$tool.css("display", "flex")
			} else {
				$tool.css("display", "none")
			}
		}
	})
})
