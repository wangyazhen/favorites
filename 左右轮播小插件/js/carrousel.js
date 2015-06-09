/**
 * Carrousel
 * Author: wangyazhen
 */

(function($, f) {
  if(!$) {
    throw new Error('本插件依赖jQuery');
  }

  var Carrousel = function() {
    var _this = this;

    /* ---- 默认配置选项 ---- */
    this.opts = {
      showButton: true,
      autoplay: false,
      hiddenBottom: false,
      delay: 3500,
      width: 960,
      height: 398,
      callback: null
    };

    this.init = function(el, opts) {

      this.opts = $.extend(this.opts, opts);

      this.container = el;
      this.viewport = $('.viewport');
      this.items = this.viewport.children();
      this.circleContainer = $('.circle');
      this.circleItems = $('.circle li');
      this.showViewport = this.viewport.parent();

      this.nextBtn = $('.next');
      this.prevBtn = $('.prev');

      this.nextBtn.click(this.nextScroll);
      this.prevBtn.click(this.prevScroll);
      this.circleItems.click(this.itemScroll);

      // 相关配置
      if (this.opts.autoplay === true) {
        this.intervalId = setInterval(function() {
          _this.nextScroll();
        }, _this.opts.delay);
      }
      if (this.opts.hiddenBottom === true) {
        this.circleContainer.remove();
      }
      if (this.opts.showButton === false) {
        this.nextBtn.remove();
        this.prevBtn.remove();
      }

      // 这个不是必须的 可以通过CSS来做
      //this.setViewportSize(this.opts.width, this.opts.height);
    };

    this.setViewportSize = function(w, h) {
      this.container.css({width: w, height: h});
      this.viewport.css({width: w * this.items.length, height: h});
      this.showViewport.css({width: w, height: h});
      this.items.css({width: w, height: h});
      this.circleItems.css({width: (w - 10) / this.circleItems.length });
    };

    this.nextScroll = function() {

      _this.viewport.stop().animate({left: _this.items.width()*-1}, 'slow', function() {
        _this.viewport.append(_this.viewport.children().first());
        $(this).css('left','0');
        _this.circle();
      });
    };

    this.prevScroll = function () {

      _this.viewport.prepend(_this.viewport.children().last());
      _this.viewport.css('left', _this.items.width()*-1);

      _this.viewport.stop().animate({left: 0}, 'slow', function() {
        _this.circle();
      });
    };

    this.circle = function() {

      var currentItem = this.viewport.children().first();
      var currentIndex = currentItem.attr('index');

      this.circleItems.removeClass('circle-cur');
      this.circleItems.eq(currentIndex).addClass('circle-cur');

      if(typeof this.opts.callback === 'function'){
        this.opts.callback(currentIndex);
      }
    };
    var animateEnd = 1;
    this.itemScroll = function(e) {
      if (animateEnd === 0) { return;}

      $(this).addClass('circle-cur').siblings().removeClass('circle-cur');

      var nextIndex = $(this).index();

      var items = _this.viewport.children();
      var firstItem = items.first();
      var lastItem = items.last();
      var currentIndex = firstItem.attr('index');
      var curr = firstItem.clone();

      var _ = this;


      if (nextIndex > currentIndex) {

        for (var i =0 ; i < nextIndex - currentIndex; i++) {
          _this.viewport.append(_this.viewport.children().first());
        }
        _this.viewport.prepend(curr);
        var offset = firstItem.width()*-1;
        if (animateEnd === 1) {
          animateEnd = 0;

          _this.viewport.stop().animate({left: offset}, 'slow', function() {
            $('.viewport li').first().remove();
            _this.viewport.css('left', 0);
            animateEnd = 1;

            if(typeof _this.opts.callback === 'function'){
              _this.opts.callback(nextIndex);
            }
          });
        }

      } else {

        var lastCopy = lastItem.clone();
        for (var i = 0; i < currentIndex - nextIndex; i++) {
          _this.viewport.prepend($('.viewport li').last());
        }
        _this.viewport.append(lastCopy);
        var offset = lastItem.width()*-1;
        _this.viewport.css('left', offset);

        if (animateEnd === 1) {
          animateEnd = 0;

          _this.viewport.stop().animate({left: 0}, 'slow', function() {
            $('.viewport li').last().remove();
            animateEnd = 1;

            if(typeof _this.opts.callback === 'function'){
              _this.opts.callback(nextIndex);
            }
          });
        }
      }
    };
  };

  /* 添加插件 */
  $.fn.carrousel = function(o) {
    var me = $(this);
    var instance = (new Carrousel()).init(me, o);
  };
})(window.jQuery, false);

