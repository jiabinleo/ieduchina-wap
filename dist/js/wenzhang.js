/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 6118:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 5635:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 4379:
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(6118)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports["default"] = $(function () {
        layui.use(['form', 'layer'], function () {
            var form = layui.form, layer = layui.layer, timeoutTimer = null;
            form.verify({
                concat_name: function (value) {
                    if (!value) {
                        return "请输入姓名";
                    }
                },
                concat_grade: function (value) {
                    if (!value) {
                        return "请选择年级";
                    }
                },
                concat_mobile: function (value) {
                    if (!value) {
                        return "请输入手机号";
                    }
                },
                concat_yzm: function (value) {
                    value = value.trim();
                    if (!value) {
                        return '请输入验证码';
                    }
                },
            });
            timeoutTimer = setTimeout(function () {
                if ($("#concat_school2").length) {
                    layer.open({
                        type: 1,
                        title: false,
                        closeBtn: 2,
                        shadeClose: true,
                        shade: 0.5,
                        skin: 'concat-school2',
                        content: $("#concat_school2")
                    });
                }
            }, 5);
            form.on("submit(concat_submit)", function (result) {
                $.ajax({
                    url: result.form.action,
                    type: result.form.method,
                    data: result.field,
                    dataType: "json",
                    success: function (res) {
                        if (res.status == 1) {
                            success("1231231231", result);
                        }
                        else {
                            layer.msg(res.info, { icon: 2 });
                        }
                    },
                    error: function () {
                        layer.msg("提交失败", { icon: 2 });
                        success("1231231231", result);
                    }
                });
                return false;
            });
            function success(phone, result) {
                result.form.reset();
                layui.form.render();
                $(".concat_school").find(".btn a").attr("href", "tel:".concat(phone));
                $(".concat_school").find(".btn button").addClass("s").html("<i></i>注册成功");
            }
            $(".concat").click(function () {
                clearTimeout(timeoutTimer);
                $('html, body').animate({
                    scrollTop: $(".concat-form").offset().top - 200
                }, 300);
            });
            $(".concat.tel").click(function () {
                $('html, body').animate({
                    scrollTop: $(".concat-iedu").offset().top - 400
                }, 300);
            });
            $(document).on("click", ".layui-layer-msg", function () {
                $(this).hide();
            });
            getCode();
            function getCode() {
                var countdown = 60, initTime = 60, timer = null;
                $(".get_concat_code").click(function () {
                    var $this = $(this);
                    var text = $(this).text();
                    var flag = true;
                    var phone = $(this).closest("form").find("input[name='mobile']").val();
                    if (!phone) {
                        layer.msg("请输入手机号码", { icon: 2, anim: 6 });
                        flag = false;
                    }
                    else if ((phone && !/^[1][0-9]{10}$/.test(phone))) {
                        layer.msg("手机号格式不正确", { icon: 2, anim: 6 });
                        flag = false;
                    }
                    else if (countdown == initTime) {
                        var successmsg = '验证码发送成功，请查看手机';
                        $this.text('发送中...').attr('disabled', "true");
                        $.ajax({
                            url: '/api.php?op=school&do=sendmobilecode&t=' + Math.random(),
                            type: 'POST',
                            dataType: 'json',
                            data: {
                                mobile: phone
                            },
                            header: {
                                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                                'X-XXS-Protection': '1;mode=block',
                                'X-Frame-Options': 'deny'
                            },
                            success: function (data) {
                                if (data == 1) {
                                    layer.msg(successmsg, { icon: 1 });
                                    $this.attr('disabled', "disabled").text(countdown + ' s');
                                    countdown--;
                                    timer = setInterval(function () {
                                        if (countdown > 0) {
                                            $this.text(countdown + ' s');
                                            countdown--;
                                        }
                                        else {
                                            $this.removeAttr('disabled').text(text);
                                            clearInterval(timer);
                                            countdown = initTime;
                                        }
                                    }, 1000);
                                }
                                else {
                                    layer.msg("验证码发送失败,请稍后再试", { icon: 2 });
                                    $this.text(text).removeAttr('disabled');
                                }
                            },
                            error: function () {
                                layer.msg("验证码发送失败,请稍后再试", { icon: 2 });
                                $this.removeAttr('disabled').text(text);
                            }
                        });
                    }
                    return flag;
                });
            }
        });
    });
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ 7630:
/***/ ((module, exports, __webpack_require__) => {

var __webpack_unused_export__;
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(5635), __webpack_require__(4379)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports) {
    "use strict";
    __webpack_unused_export__ = ({ value: true });
    var el = null;
    searchschool();
    function searchschool() {
        var timer = null;
        $(document).keyup("#want_school", function (e) {
            clearTimeout(timer);
            timer = setTimeout(function () {
                el = $(e.srcElement);
                var keyword = el.val().trim();
                if (keyword) {
                    $.ajax({
                        url: "/index.php?m=content&c=ajax&a=keyschool&t=" + Math.random(),
                        type: "get",
                        dataType: "html",
                        data: {
                            name: keyword
                        },
                        success: function success(res) {
                            res = "<ul><li>\u4E0A\u6D77\u7EBD\u7EA6\u5927\u5B66</li><li>WLSA\u4E0A\u6D77\u5B66\u6821</li><li>\u4E0A\u6D77\u82F1\u56FD\u5916\u7C4D\u4EBA\u5458\u5B50\u5973\u5B66\u6821\u6D66\u897F\u6821\u533A</li><li>\u4E0A\u6D77\u5B8B\u5E86\u9F84\u5B66\u6821\u56FD\u9645\u90E8</li><li>\u4E0A\u6D77\u6FB3\u5927\u5229\u4E9A\u56FD\u9645\u5B66\u6821</li><li>\u4E0A\u6D77\u5E94\u7528\u6280\u672F\u5927\u5B66\u56FD\u9645\u6559\u80B2\u4E2D\u5FC3\u4E9A\u6D32\u5B66\u58EB\u6865</li><li>\u4E0A\u6D77\u8BFA\u7F8E\u5B66\u6821</li><li>\u4E0A\u6D77\u52A0\u62FF\u5927\u56FD\u9645\u4E2D\u5B66</li><li>\u4E0A\u6D77\u65B0\u52A0\u5761\u56FD\u9645\u5B66\u6821</li><li>\u4E0A\u6D77\u8000\u4E2D\u5916\u7C4D\u4EBA\u5458\u5B50\u5973\u5B66\u6821</li><li>\u4E0A\u6D77\u6559\u79D1\u5B9E\u9A8C\u4E2D\u5B66\u56FD\u9645\u6559\u80B2\u878D\u5408\u90E8</li><li>\u4E0A\u6D77\u60E0\u7075\u987F\u56FD\u9645\u5B66\u6821</li><li>\u4E0A\u6D77\u71CE\u539F\u53CC\u8BED\u5B66\u6821-\u56FD\u9645\u8BFE\u7A0B</li><li>\u4E0A\u6D77\u4E07\u79D1\u53CC\u8BED\u5B66\u6821</li><li>\u4E0A\u6D77\u65B0\u8679\u6865\u4E2D\u5B66</li><li>\u4E0A\u6D77\u535A\u534E\u7F8E\u56FD\u9AD8\u4E2D</li><li>\u4E0A\u6D77\u82F1\u56FD\u5916\u7C4D\u4EBA\u5458\u5B50\u5973\u5B66\u6821\u6D66\u4E1C\u6821\u533A</li></ul>";
                            $(".searchschool").find("ul").remove();
                            if (res) {
                                $(".searchschool").append(res);
                            }
                        },
                        error: function error() {
                            var res = "<ul><li>\u4E0A\u6D77\u7EBD\u7EA6\u5927\u5B66</li><li>WLSA\u4E0A\u6D77\u5B66\u6821</li><li>\u4E0A\u6D77\u82F1\u56FD\u5916\u7C4D\u4EBA\u5458\u5B50\u5973\u5B66\u6821\u6D66\u897F\u6821\u533A</li><li>\u4E0A\u6D77\u5B8B\u5E86\u9F84\u5B66\u6821\u56FD\u9645\u90E8</li><li>\u4E0A\u6D77\u6FB3\u5927\u5229\u4E9A\u56FD\u9645\u5B66\u6821</li><li>\u4E0A\u6D77\u5E94\u7528\u6280\u672F\u5927\u5B66\u56FD\u9645\u6559\u80B2\u4E2D\u5FC3\u4E9A\u6D32\u5B66\u58EB\u6865</li><li>\u4E0A\u6D77\u8BFA\u7F8E\u5B66\u6821</li><li>\u4E0A\u6D77\u52A0\u62FF\u5927\u56FD\u9645\u4E2D\u5B66</li><li>\u4E0A\u6D77\u65B0\u52A0\u5761\u56FD\u9645\u5B66\u6821</li><li>\u4E0A\u6D77\u8000\u4E2D\u5916\u7C4D\u4EBA\u5458\u5B50\u5973\u5B66\u6821</li><li>\u4E0A\u6D77\u6559\u79D1\u5B9E\u9A8C\u4E2D\u5B66\u56FD\u9645\u6559\u80B2\u878D\u5408\u90E8</li><li>\u4E0A\u6D77\u60E0\u7075\u987F\u56FD\u9645\u5B66\u6821</li><li>\u4E0A\u6D77\u71CE\u539F\u53CC\u8BED\u5B66\u6821-\u56FD\u9645\u8BFE\u7A0B</li><li>\u4E0A\u6D77\u4E07\u79D1\u53CC\u8BED\u5B66\u6821</li><li>\u4E0A\u6D77\u65B0\u8679\u6865\u4E2D\u5B66</li><li>\u4E0A\u6D77\u535A\u534E\u7F8E\u56FD\u9AD8\u4E2D</li><li>\u4E0A\u6D77\u82F1\u56FD\u5916\u7C4D\u4EBA\u5458\u5B50\u5973\u5B66\u6821\u6D66\u4E1C\u6821\u533A</li></ul>";
                            $(".searchschool").find("ul").remove();
                            if (res) {
                                $(".searchschool").append(res);
                            }
                        }
                    });
                }
                else {
                }
            }, 400);
        });
        $(document).on("click", function (e) {
            try {
                var list = $(el).parent()[0];
                if (e.target !== list && !$.contains(list, e.target)) {
                    $(".searchschool").find("ul").hide();
                }
                else {
                    if ($(e.target).attr("type") == "text") {
                        var ul = $(e.target).siblings(".searchschool").find("ul");
                        if (ul.find("li").length) {
                            ul.show();
                        }
                    }
                    else {
                        $("#want_school");
                        $(e.target).closest(".searchschool").siblings("input[type='text'][name='want_school']").val($(e.target).text());
                        $(e.target).closest(".searchschool").find("ul").hide();
                    }
                }
            }
            catch (error) {
            }
        });
    }
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module used 'module' so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(7630);
/******/ 	
/******/ })()
;