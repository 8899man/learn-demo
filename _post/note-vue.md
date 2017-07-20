vue.js 通过 v-on 完成事件处理与绑定，比如为一个button绑定click事件，我们就可以这么写：
```
<button v-on:click="doSomething">doSomething</button>
```
也可以缩写：
```
<button @click="doSomething">doSomething</button>
```

var vm = new Vue({
    //选项
})
一个Vue实例其实正是一个 MVVM 模式中所描述的 ViewModel 因此在文档中经常会使用 vm 这个变量名。

每个Vue实例都会 **代理** 其 data 对象里所有的属性：
``` javascript
var data = {a: 1}
var vm = new Vue({
    data: data
})
vm.a === data.a // -> true
//设置属性也会影响到原始数据
vm.a = 2
data.a // -> 2
//反之亦然
data.a = 3
vm.a // -> 3
```

过滤器可以串联：
``` javascript
{{ message | filterA | filterB}}
```
例如：
```
{{message | reverse | uppercase}}
```
这里reverse并不是内建的过滤器，我们可以用Vue.filter自定义：
```
Vue.filter('reverse',function(value){
    return value.split('').reverse().join('')
})
```
过滤器也可以接受参数：
``` javasript
{{ message | filterA 'arg1' arg2}}
```
过滤器函数始终以表达式的值作为第一个参数。带引号的参数视为字符串，而不带引号的参数按表达式计算。这里，字符串 'arg1' 将传给过滤器作为第二个参数，表达式 `arg2` 的值在计算出来之后作为第三个参数。

---
如果你比较细心的话，在数据还未加载完时是会有闪烁的情况出现，解决办法也很简单，使用v-cloak，然后定义css:
[v-cloak] { display: none}

---

vue-resource作为vue插件的形式存在，通过XMLHttpRequest 或 JSONP 发起请求并处理响应。在开发中也非常常见，现在我们用vue-resource来请求books：

