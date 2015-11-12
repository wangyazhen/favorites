#  一些读书笔记

##《javascript 语言精粹》
	1. 通过delete 删除一个数组元素 并不会改变数组的长度  必须通过splice删除
	2. 绝不在一个if 条件部分使用副职表达式 因为
	   if (a =b ) {...}
	   	可能的本意是
	   if (a === b) { ...}
	3. 精简的javascript里都是好东西 ，包括以下内容
           函数是头等对象
           基于原型继承的动态对象
           对象字面量和数组字面量
    4. var arr = [];  判断是对象还是数组 通过arr.contructor 来判断  
    	辨别arguments 或数组 可以 typeof arr.slice === 'function'
    5. 建议永远使用 === 而抛弃使用邪恶的孪生兄弟 ==
    6. 鸡肋
    	== 
    	width
    	eval 减弱了安全性，降低了性能  
    		Function构造器，setTimeout，setInterval 当传递字符串参数时， 会像eval那样去处理， 应避免使用
    	continue 应该通过重构移除 continue 语句
    	应该避免 switch 贯穿
    	构造函数命名 首字母大写
    	避免 new Object() new Array()  因为完全没有必要
    7. json 
        整数的首位不允许为0 因为一些语言用它来表示八进制	

## Excel 公式
excell json 公式
`=CONCATENATE("""",A1, """:""",B1, """",",") `
