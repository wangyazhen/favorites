# jquery 源码 


## Get first & Set all
>jQuery很灵活的一点就是，同样一个接口，通过参数不同来区别它是GET还是SET方法。

例如：
-	`$('#test').val()`是获取输入框的值，而`$('#test').val('new input value')`是设置输入框里边的值


举个例子说：`var doms = $(‘.input’)`，获取到10个input节点。
那`doms.val()`返回的是哪个输入框的值呢？而`doms.val(‘new input value’)`又是设置哪个输入框的值？
这里有个设计的原则：**Get first & Set all**。


## CSS选择器的解析顺序 
#### 如果解析器从左向右解析会有什么问题？
假设用从左到右的顺序解析：`div .clr > input[name="readme"] + p`，我们需要先找到所有div节点，然后从第一个div节点开始向下找`class='clr'`的节点，一直深度下去，遇到不匹配的情况，就必须回溯到一开始搜索的div节点，然后去搜索下个div节点，重复这样的过程。

这样的搜索过程对于一个只是匹配很少节点的选择器来说，效率是极低的，因为我们花费了大量的时间在回溯匹配不符合规则的节点。
#### CSS解析器是从右向左解析的
还是上边那个选择器，一开始我们把DOM树中所有的`p`节点找出来，紧接着我们判断这些节点中的前兄弟节点是否符合`input[name="readme"]`这个规则，这样就又减少了集合的元素，只有符合当前的子规则才会匹配再上一条子规则。

浏览器解析CSS的引擎就是用这样的算法去解析，同理，Sizzle引擎也是如此，并且在源码里边，它判断一个节点是否符合某个规则的行为定义为matcher。


### jquery hasChild 实现
```js
$.fn.hasChild = function(selector){
  return ($("> " + selector, this).length > 0);
};
```
### jquery hasScrollBar 

```js
(function($) {
  $.fn.hasScrollBar = function() {
      return this.get(0).scrollHeight > this.height();
  }
})(jQuery);
```          