# angular 记录

## 指令
`@``=``&` 三个的用法
```js
return {
	scope: {
		name: '@',
		title: '=',
		changeName: '&'
	}
}
```

*  `@` 单向字符串绑定，后面使用 {{}}进行赋值
*  `=` 模型绑定, 后面使用 scope 中的属性名字
*  `&` 方法绑定。后面直接跟方法调用

```html
<div class="directive" my-directive
            name="{{name}}"
            title="title"
            change-name="changeName()"
></div>
```