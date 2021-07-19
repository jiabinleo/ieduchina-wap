$(function () {
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
						textToast(successmsg)
					} else if (data.status == 0) {
						textToast(successmsg)
					}
					applyFlag = true;
					$(self).html(btnTxt);
				},
				error: function () {
					applyFlag = true;
					$(self).html(btnTxt);
					textToast(errormsg)
					if($(self).attr("html")){
						window.location=$(self).attr("html")
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
			textToast(nullmsg)
			return false;
		}
		if (datatype && !dataReg[datatype].test(value)) {
			error.html($(element).attr('errormsg'));
			$(element).addClass('error');
			textToast($(element).attr('errormsg'))
			return false;
		}
		if ($(element).attr('mobileOrEmail') && !dataReg.phone.test(value) && !dataReg.email.test(value)) {
			textToast('请输入正确的手机号码或者邮箱');
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
			textToast('请输入手机号码')
			return false;
		}
		if ((phone && !dataReg.phone.test(phone))) {
			textToast('手机号格式不正确')
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
						textToast(successmsg)
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
						textToast('验证码发送失败,请稍后再试')
						$this.val(text).removeAttr('disabled');
					}
				},
				error: function () {
					textToast('验证码发送失败,请稍后再试')
					$this.val(text).removeAttr('disabled');
				}
			})
		}
	});
	$(document).on('click', '.back', function () {
		window.history.go(-1);
	})

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

	function textToast(msg) {
		var $textToast = $('<div id="textToast" style="display: none;">' +
			'<div class="weui-mask_transparent"></div>' +
			'<div class="weui-toast weui-toast_text">' +
			'<p class="weui-toast__content">' + msg + '</p>' +
			'</div>' +
			'</div>')
		$(document.body).append($textToast)
		$textToast.fadeIn(100);
		setTimeout(function () {
			$textToast.fadeOut(100, function () {
				$textToast.remove()
			});
		}, 2000);
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

	if ($(".creative-menu").length) {
		setmenu()
		$(window).on('scroll', function () {
			setmenu()
		});

		function setmenu() {
			if ($('.creative-menu')[0].offsetTop - $(window).scrollTop() <= $(".header").height()) {
				$(".creative-menu").addClass("fixed")
			} else {
				$(".creative-menu").removeClass("fixed")
			}
		}
	}
	var data = {
		name: "全部",
		status: "全部"
	}
	$(".creative-menu").on("click", 'button', function () {
		if ($(this).closest('.menu-top').length) {
			$(this).addClass("active").siblings().removeClass("active")
			data = {
				name: $(this).text(),
				status: "全部"
			}
			$(".menu-bottom").find("button").removeClass("active").eq(0).addClass("active")
		} else if ($(this).closest('.menu-bottom').length) {
			$(this).addClass("active").siblings().removeClass("active")
			data.status = $(this).text();
		}
		console.log(data)
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
				textToast('数据加载失败')
			}
		})
	})

	$(document).on("click", '.operation', function () {
		var $tool = $(this).closest(".lis").siblings('.tool')
		var flag = $tool.css("display") == 'none'
		if (flag) {
			$tool.css("display", "flex")
		} else {
			$tool.css("display", "none")
		}
	})

	$(document).on("click", ".dynamic-list .operation", function (e) {
		var $men = $(this).find(".men");
		$(this).closest("li").siblings("li").find(".men").hide();
		if ($men.css("display") == "none") {
			$(this).find(".men").show();
		} else {
			if ($(this).find(".men").is(e.target)) {
				$(this).find(".men").hide();
			} else {
				console.log($(e.target).text())
			}
		}
		return false;
	})

	$(document).on("click", function (e) {
		var con = $(this).find(".men");
		$(this).siblings("li").find(".men").hide();
		if (!con.is(e.target) && con.has(e.target).length === 0 && con.css("display") == "block") {
			con.hide()
		}else if(con.has(e.target).length === 0){
			con.hide()
		}
	})
	$(document).on("click", ".follow", function () {
		var followNume = parseInt($(".follow-nume").text())
		if ($(this).text() == "关注") {
			followNume ++ 
			$(this).closest("body").find(".follow").text("取消关注");
		} else {
			followNume --
			$(this).closest("body").find(".follow").text("关注");
		}
		$(".follow-nume").text(followNume)
	})
	
	//草稿箱
	$(document).on("click",".del-btn",function(){
		if($(this).text()=="管理"){
			$(this).text("取消")
			$(".drafts-list").addClass("ing")
			$('.weui-actionsheet').addClass('weui-actionsheet_toggle');
		}else{
			$(this).text("管理")
			$(".drafts-list").removeClass("ing")
			hideActionSheet()
		}
	})
	$(".drafts-list").on("click","li",function(){
		if($(".drafts-list.ing").length){
			var  $checkbox = $(this).find("input[type='checkbox']")
			if($checkbox.attr("checked")){
				$checkbox.attr("checked",false);
				 // $("#cb1″).prop("checked",true);
			}else{
				$checkbox.attr("checked",true);
			}
		}else{
			console.log("跳转页面")
		}
	})
	function hideActionSheet() {
		$('.weui-actionsheet').removeClass('weui-actionsheet_toggle');
	}

	if($(".swiper-menu").length){
		var menu = new Swiper('.swiper-menu', {
			loop: false,
			autoplay: false,
			// slidesPerView: 5,
			 slidesPerView: 'auto',
			// spaceBetween: 25
		})
	}
})
