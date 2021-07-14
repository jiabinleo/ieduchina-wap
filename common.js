$.fn.extend({
    //fixed元素跟随滚动条滚动
    scrollFollow: function(opts) {
        var $scrollEle = this;
        var topNum = parseInt($scrollEle.css("top") + "");
        function animateFn() {
            var scrollTop = $(window).scrollTop();
            var scrollTopNum = $(window).scrollTop();
            //获取网页被卷去的高
            var bodyheight = $('body').height() / 2;
            if (opts.animate) {
                if (scrollTopNum > bodyheight) {
                    $scrollEle.stop(true, true).delay(0).animate({
                        top: scrollTopNum + topNum
                    }, "slow");
                } else {
                    $scrollEle.stop(true, true).delay(0).animate({
                        top: scrollTopNum + topNum
                    }, "slow");
                }
            } else {
                $scrollEle.css({
                    'position': 'fixed',
                    'top': '50%'
                });
            }
        }
        $(window).on('scroll', throttle(animateFn, 500, 1000));
    },
    /*
     *回到顶部效果
     */
    scrollUpTop: function(opt) {
        var defaults = {
            speed: 800
        };
        var opts = $.extend(defaults, opt);
        $(this).each(function() {
            $(this).click(function() {
                $('html, body').stop(true, true).animate({
                    'scrollTop': 0
                }, opts.speed);
            })
        });
    },
    /*
     *鼠标移入效果,常用于栏目导航
     */
    hoverActive: function(opt) {
        var defaults = {
            activeClass: "active",
            childNode: ".item",
            showContent: "", //tabbar效果
            slideOrigin: true
        };
        var opts = $.extend(defaults, opt);
        var origIdx = $(this).find(opts.childNode + "." + opts.activeClass).index();
        var items = $(this).find(opts.childNode);
        items.hover(function() {
            var idx = $(this).index();
            $(this).addClass(opts.activeClass).siblings().removeClass(opts.activeClass);
            $(opts.showContent).eq(idx).show().siblings().hide();
        }, function() {
            if (opts.slideOrigin) {
                items.eq(origIdx).addClass(opts.activeClass).siblings().removeClass(opts.activeClass);
                $(opts.showContent).eq(origIdx).show().siblings().hide();
            } else {
                var idx = $(this).index();
                $(this).addClass(opts.activeClass).siblings().removeClass(opts.activeClass);
                $(opts.showContent).eq(idx).show().siblings().hide();
            }

        });

    },
    /*
     *滚动滚动条给元素添加类，常用于元素动画
     */
    scrollDoAnim: function(opt) {
        var defaults = {
            targetEle: ".do-anim",
            activeClass: "active",
            backScroll: false//是否回滚执行动画
        }
        var opts = $.extend(defaults, opt);
        var animDom = $(opts.targetEle);
        //带有目标class的元素
        $(window).on('scroll', throttle(roll, 50, 1000));
        function roll() {
            //滚动执行动画
            var oHeight = $(window).height();
            var scollTop = $(window).scrollTop();
            animDom.each(function(i) {
                if (scollTop + oHeight > animDom.eq(i).offset().top + 100) {
                    animDom.eq(i).addClass(opts.activeClass);
                    //动画元素类名
                } else {
                    if (opts.backScroll) {
                        animDom.eq(i).removeClass(opts.activeClass);
                        //动画元素类名
                    }
                }
            })
        }
        ;

    },
    /*
     *loading加载
     */
    onloadLoding: function(options) {
        var defaults = {
            opacity: 1,
            delayTime: 1000,
            zindex: 999,
            sleep: 0
        }
        var options = $.extend(defaults, options);
        var loadingHtml = '<div id="loading" style="z-index:' + options.zindex + ';opacity:' + options.opacity + '"></div>'
        $("body").append(loadingHtml);
        document.onreadystatechange = PageLoaded;

        function PageLoaded() {
            if (document.readyState == "complete") {
                var loadingMask = $('#loading');
                setTimeout(function() {
                    loadingMask.animate({
                        "opacity": 0
                    }, options.delayTime, function() {
                        $(this).hide();
                    });
                }, options.sleep);
            }
        }

    },
    /*
     *移动端导航切换
     */
    toggleMenu: function(options) {
        var LM = function(ele, options) {
            this.$element = ele;
            this.defaults = {};
            this.settings = $.extend({}, this.defaults, options)
        }
        LM.prototype = {
            menu: function() {
                var $btn = $(this.settings.triggerBtn);
                var _this = this.$element;
                $('.menu-dark-backdrop').on('click', function() {
                    if (_this.hasClass('menu-open')) {
                        _this.removeClass('menu-open')
                        $('.menu-dark-backdrop').removeClass('in').off()
                        $('body').css("overflow", "auto")
                        _this.find('li.hasChild').removeClass('open').off().find('div').css({
                            "height": 0
                        })
                        $btn.removeClass("active");
                        _this.scrollTop(0);

                    } else {
                        _this.addClass('menu-open')
                        $('.menu-dark-backdrop').addClass('in')
                        $('body').css("overflow", "hidden");
                        $btn.addClass("active");
                    }
                })
            },
            init: function() {
                var _this = this.$element;
                var obj = this;
                var $btn = $(this.settings.triggerBtn);
                $btn.click(function() {
                    var _this = $(this);
                    if (!$('body').find('div').hasClass('menu-dark-backdrop')) {
                        $('body').prepend('<div class="menu-dark-backdrop"></div>')
                    }
                    if (obj.$element.hasClass('menu-open')) {
                        _this.removeClass("active");
                        obj.$element.find("li.hasChild").removeClass("open");
                        obj.$element.find("li.hasChild").children("div").removeClass("hauto");
                        obj.$element.removeClass('menu-open')
                        $('.menu-dark-backdrop').removeClass('in').off();
                        $('body').css({
                            "overflow": "auto"
                        })
                        $('body').css("overflow", "auto")
                        obj.$element.scrollTop(0)
                    } else {
                        obj.$element.addClass(options.dir + "Menu").addClass('menu-open');
                        _this.addClass("active");
                        $('.menu-dark-backdrop').addClass('in')
                        $('body').css({
                            "overflow": "hidden"
                        })
                        obj.menu()
                    }
                });

                _this.find('li.hasChild>.toggle-sub').click(function() {
                    var _this = $(this);
                    if (_this.parent().hasClass("hasChild")) {
                        _this.parent().toggleClass("open");
                        _this.parent().children("div").toggleClass('hauto');
                        _this.parent().siblings().removeClass("open");
                        _this.parent().siblings().children("div").removeClass("hauto");
                        var isopen = _this.parent().siblings().children("div").find(".hasChild").hasClass("open");
                        if (isopen) {
                            _this.parent().siblings().children("div").find(".hasChild").removeClass("open");
                            _this.parent().siblings().find(".div").removeClass("hauto");
                        }
                    }
                })
                var obj = this;
                obj.menu()
            }
        };
        var lm = new LM(this,options);
        if (options.dir != undefined || options.dir != "") {
            lm.$element.addClass(options.dir + 'Menu')
        }
        return lm
    },
    /*
     *鼠标跟随导航active类有高亮横线
     */
    hoverFlowMenu: function(opt) {
        var defaults = {
            item: ".item",
            activeClass: "active",
            targetFlowEl: ".slide-border"
        };
        var opts = $.extend(defaults, opt);
        var origOffLeft = $(this).find(opts.item + "." + opts.activeClass).offset().left;
        var origIdx = $(this).find(opts.item + "." + opts.activeClass).index();
        var item = $(this).find(opts.item);
        var width = $(this).find('.' + opts.activeClass).innerWidth();
        layout.watch(function() {
            throttle(animFn, 50, 1000);
        })
        // $(opts.targetFlowEl).css({ left: origOffLeft,'width':width });
        function animFn() {
            $(opts.targetFlowEl).css({
                left: origOffLeft,
                'width': width
            });
        }
        animFn();
        item.hover(function() {
            var offLeft = $(this).offset().left;
            width = $(this).innerWidth();
            $(opts.targetFlowEl).css({
                left: offLeft,
                'width': width
            });
            $(this).addClass(opts.activeClass).siblings().removeClass(opts.activeClass);
        }, function() {
            $(opts.targetFlowEl).css({
                left: origOffLeft,
                'width': width
            });
            item.eq(origIdx).addClass(opts.activeClass).siblings().removeClass(opts.activeClass);
        });

    },
    // 判断元素不为0，常用于dom绑定事件
    notEmpty: function() {
        return $(this).length != 0;
    },
    rennderSwiper: function(opt) {
        var defaults = {
            autoplay: 5000,
            autoplayDisableOnInteraction: false,
            pagination: '.swiper-pagination',
            prevButton: '.swiper-button-prev',
            nextButton: '.swiper-button-next',
            paginationClickable: true
        };
        var opts = $.extend(defaults, opt)
        if (this.notEmpty()) {
            return new Swiper(this,opts)
        }
    },
    rennderSlick: function(opt) {
        var defaults = {
            autoPlay: true,
            speed: 2500
        };
        var opts = $.extend(defaults, opt);
        if ($(this).notEmpty()) {
            obj.ckSlide(opts);
        }
        ;
    },
    // 百度在线咨询
    bdOnlineChat: function() {
        $(this).each(function() {
            $(this).click(function(e) {
                if (e && e.preventDefault)
                    e.preventDefault();
                    //IE中阻止函数器默认动作的方式
                else {
                    window.event.returnValue = false;
                }
                ;if ($('#nb_invite_ok').notEmpty()) {
                    $('#nb_invite_ok').click();
                }
            })
        })
    },
    resetClientHeight: function() {
        $('body, html').css({
            'height': 'auto',
            'min-height': '100%'
        })
    }
});
$(document).resetClientHeight();
$(document).onloadLoding();
// 取得屏幕设备
var MIN_CONTENT_WIDTH = 1440;
var MOBILE_BREAKPOINT = 992;
var layout = {
    get: function() {
        var viewport = $(window).width();
        if (viewport <= MOBILE_BREAKPOINT) {
            return 'mobile';
        }
        return 'desktop';
    },
    watch: function(callback) {
        callback(layout.get());
        $(window).on('smartresize orientationchange', function() {
            callback(layout.get());
        });
    }
};
$(window).on('resize', throttle(function() {
    $(window).trigger('smartresize');
}, 50));

window.layout = layout;

// 节流函数，防止重复触发
function throttle(fun, delay, time) {
    var timeout, startTime = new Date();
    return function() {
        var context = this
          , args = arguments
          , curTime = new Date();
        clearTimeout(timeout);
        // 如果达到了规定的触发时间间隔，触发 handler
        if (curTime - startTime >= time) {
            fun.apply(context, args);
            startTime = curTime;
            // 没达到触发间隔，重新设定定时器
        } else {
            timeout = setTimeout(fun, delay);
        }
    }
    ;
}
