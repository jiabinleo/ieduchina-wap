/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

/* webpackjs */

var lives = {
  init: function init() {
    this.banner();
  },
  banner: function banner() {
    new Swiper('.banner', {
      autoplay: true,
      loop: true,
      pagination: {
        el: '.swiper-banner-pagination'
      }
    });
  }
};
$(function () {
  lives.init();
});
/* webpackjs */
/******/ })()
;