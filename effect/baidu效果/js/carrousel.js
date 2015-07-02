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

      
      this.viewport = el;
      this.items = this.viewport.children();
      
      this.items.click(this.itemScroll);

      // 相关配置
      if (this.opts.autoplay === true) {
        this.intervalId = setInterval(function() {
          _this.nextScroll();
        }, _this.opts.delay);
      }
      
    };

    

    this.itemScroll = function() {
      var that = this, $that = $(this);

      
      _this.items.removeClass('active');
      $that.addClass('active');
      // 获取上一个 下一个 分别设置 left值
      var index = $that.index();
      _this.items.eq(index).animate({left: 260}, 'slow');

      _this.items.eq(index-1).animate({left: 40}, 'slow');
      _this.items.eq(index-2).animate({left: 500}, 'slow');

      // https://github.com/fredleblanc/roundabout/blob/master/jquery.roundabout.js
     /* _this.viewport.stop().animate({left: _this.items.width()*-1}, 'slow', function() {
        _this.viewport.append(_this.viewport.children().first());
        $(this).css('left','0');
        _this.circle();
      });*/
    };
    
  };

  /* 添加插件 */
  $.fn.carrousel = function(o) {
    var me = $(this);
    var instance = (new Carrousel()).init(me, o);
  };
})(window.jQuery, false);


// http://wangmeng.baidu.com/know-wm.html
// 未完 待续