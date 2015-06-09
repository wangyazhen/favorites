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

    this.opts = {
      autoplay: false,
      hiddenBottom: false,
      delay: 3500,
      callback: null
    };

    this.init = function(el, opts) {

      this.opts = $.extend(this.opts, opts);

      this.viewport = $('.viewport');
      this.items = this.viewport.children();
      this.circleContainer = $('.circle');
      this.circleItems = $('.circle li');

      $('.next').click(this.nextScroll);
      $('.prev').click(this.prevScroll);
      this.circleItems.click(this.itemScroll);

      if (this.opts.autoplay === true) {
        this.intervalId = setInterval(function() {
          _this.nextScroll();
        }, _this.opts.delay);
      }
      if (this.opts.hiddenBottom === true) {
        this.circleContainer.hide();
      }
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

