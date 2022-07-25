/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

var abroad = {
  init: function init() {
    this.swiper();
    this.handleScroll();
  },
  swiper: function swiper() {
    new Swiper('.banner', {
      autoplay: true,
      loop: true,
      pagination: {
        el: '.banner-pagination'
      }
    });
  },
  handleScroll: function handleScroll() {
    $(window).scroll(function () {
      // scroll at bottom
      console.log($(window).scrollTop() + $(window).height());
      console.log($(document).height());

      if ($(window).scrollTop() + $(window).height() > $(document).height() - 120) {
        $(".footer-tools").hide();
      } else {
        $(".footer-tools").show();
      }
    });
  }
};
$(function () {
  abroad.init();
});
/******/ })()
;