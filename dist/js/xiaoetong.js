/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 6684:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 1316:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 3880:
/***/ ((module, exports, __webpack_require__) => {

var __webpack_unused_export__;
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(1316), __webpack_require__(6684)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports) {
    "use strict";
    __webpack_unused_export__ = ({ value: true });
    layui.use(['form', 'jquery', 'layer'], function () {
        var $ = layui.jquery, form = layui.form, layer = layui.layer;
        form.verify({
            name: function (value) {
                if (!value) {
                    return "请输入姓名";
                }
            },
            mobile: function (value) {
                if (!value) {
                    return "请输入电话";
                }
            },
            grade: function (value) {
                if (!value) {
                    return "请选择年级";
                }
            }
        });
        form.on("submit(submit)", function (value) {
            $.ajax({
                url: value.form.action + "&t=" + Math.random(),
                type: value.form.method,
                dataType: "JSON",
                data: value.field,
                success: function (res) {
                    if (res.status == 1) {
                        layer.msg("提交成功", { icon: 1 });
                        window.location.href = "https://dtj.xet.tech/s/1jj34B";
                    }
                    else {
                        layer.msg(res.info, { icon: 2 });
                    }
                },
                error: function () {
                    layer.msg("数据提交失败", { icon: 2 });
                }
            });
            return false;
        });
        var winHeight = $(window).height();
        $(window).resize(function () {
            var thisHeight = $(this).height();
            if (winHeight - thisHeight > 140) {
                $('button[type=submit]').css({ 'position': 'absolut', 'bottom': '-50vh' });
            }
            else {
                $('button[type=submit]').css({ 'position': 'fixed', 'bottom': '0' });
            }
        });
    });
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
/******/ 	var __webpack_exports__ = __webpack_require__(3880);
/******/ 	
/******/ })()
;