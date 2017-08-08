## 在 Vue1.x ：

每一个vue的实例（new Vue({})）就是一个组件。
每一个vue的实例（new Vue({})）中需要 el 属性绑定到一个对应需要渲染的模版上，
vue的实例中的属性还有：data methods

v-if 特性被称为**指令**。指令带有前缀v- 。
也有一些其它指令，每个都有特殊的功能。例如 v-for 指令用于显示数组元素，v-bind 指令用于绑定 HTML 特性。

vue.js 通过 v-on 完成事件处理与绑定，比如为一个button绑定click事件，我们就可以这么写：
```
<button v-on:click="doSomething">doSomething</button>
```
也可以缩写：
```
<button @click="doSomething"
>doSomething</button>
```

var vm = new Vue({
    //选项
})
一个Vue实例其实正是一个 MVVM 模式中所描述的 ViewModel 因此在文档中经常会使用 vm 这个变量名。

可以扩展 Vue 构造器，从而用预定义选项创建可复用的组件构造器。
```
var myComponent = Vue.extend({
    //扩展选项
})

// 所有的 `MyComponent` 实例都将以预定义的扩展选项被创建
var myComponentInstance = new MyComponent()
```

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

除了这些数据属性，Vue 实例暴露了一些有用的实例属性与方法。这些属性与方法都有前缀 $，以便与代理的数据属性区分。例如：
```
var data = { a: 1 }
var vm = new Vue({
  el: '#example',
  data: data
})

vm.$data === data // -> true
vm.$el === document.getElementById('example') // -> true

// $watch 是一个实例方法
vm.$watch('a', function (newVal, oldVal) {
  // 这个回调将在 `vm.a`  改变后调用
})
```
这个是什么意思呢？
**就是说：**一个 vue 的实例中的data字段中的属性，可以直接被vue的实例代理。
vm.a 其实就是 vue实例中的data字段中的a属性的值。
那么，如果要直接调用vue实例的字段属性呢？vue.data能调用到吗？
答案是不能。
应该用 vm.$data， 同理，vue实例的其他字段属性也是这样来调用，只有数据属性是被直接代理到vue的实例上了。

## Vue 实例的生命周期以及钩子
Vue 实例在创建时有一系列初始化步骤——例如，它需要建立数据观察，编译模板，创建必要的数据绑定。在此过程中，它也将调用一些**生命周期钩子**，给自定义逻辑提供运行机会。例如 created 钩子在实例创建后调用。
``` 
var vm = new Vue({
  data: {
    a: 1
  },
  created: function () {
    // `this` 指向 vm 实例
    console.log('a is: ' + this.a)
  }
})
```
钩子说白了，就是钩到声明周期的某个时间点上，到了这个时间点，这个钩子就触发了。
那么created在实例创建后，就会自动触发执行。
也有一些其它的钩子，在实例生命周期的不同阶段调用，如 compiled、 ready 、destroyed。钩子的 this 指向调用它的 Vue 实例。




## 数据绑定语法
Vue.js 的模板是基于 DOM 实现的。这意味着所有的 Vue.js 模板都是可解析的有效的 HTML，且通过一些特殊的特性做了增强。Vue 模板因而从根本上不同于基于字符串的模板，请记住这点。

{{ message }}   //双向绑定，每当这个属性变化时它也会更新。
{{* message }}    //单词插值，今后的数据变化就不会再引起插值更新了。

双 Mustache 标签将数据解析为纯文本而不是 HTML。为了输出真的 HTML 字符串，需要用三 Mustache 标签：
{{ message }}  //双Mustache会将html标签中的左右尖括号解析成`&lt;&rt;`。

> XSS ： Cross-site-scripting
> 为什么简写是 XSS ，为了和 CSS 区分开。


放在 Mustache 标签内的文本称为绑定表达式。在 Vue.js 中，一段**绑定表达式**由一个简单的 JavaScript 表达式和可选的【一个或多个】过滤器构成。

到目前为止，我们的模板只绑定到简单的属性键。不过实际上 Vue.js 在数据绑定内支持全功能的 JavaScript 表达式：
```
{{ number + 1 }}

{{ ok ? 'YES' : 'NO' }}

{{ message.split('').reverse().join('') }}
```
这些表达式将在所属的 Vue 实例的作用域内计算。但有一个限制是每个绑定只能包含单个表达式，因此下面的语句是无效的：
```
<!-- 这是一个语句，不是一个表达式： -->
{{ var a = 1 }}

<!-- 流程控制也不可以，可改用三元表达式 -->
{{ if (ok) { return message } }}
```
这就涉及到js表达式和语句的区别了。



## 过滤器

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


## 指令
指令 (Directives) 是特殊的带有前缀 v- 的特性。指令的值限定为**绑定表达式**，因此上面提到的 JavaScript 表达式及过滤器规则在这里也适用。指令的职责就是**当其表达式的值改变时把某些特殊的行为应用到 DOM 上**。我们来回头看下“概述”里的例子：
``` 
<p v-if="greeting">Hello!</p>
```
这里 v-if 指令将根据表达式 greeting 值的真假删除/插入 `<p>` 元素。

## 参数

有些指令可以在其名称后面带一个“参数” (Argument)，中间放一个冒号隔开。例如，v-bind 指令用于响应地更新 HTML 特性：
`v-bind:href="url"`
`v-on:click="doSomething"`


## 修饰符

修饰符 (Modifiers) 是以半角句号 . 开始的特殊后缀，用于表示指令应当以特殊方式绑定。例如 .literal 修饰符告诉指令将它的值解析为一个字面字符串而不是一个表达式：

`<a v-bind:href.literal="/a/b/c"></a>`

## 缩写
因此Vue.js 为两个最常用的指令 v-bind 和 v-on 提供特别的缩写：
v-bind 缩写
```
<!-- 完整语法 -->
<a v-bind:href="url"></a>

<!-- 缩写 -->
<a :href="url"></a>

<!-- 完整语法 -->
<button v-bind:disabled="someDynamicCondition">Button</button>

<!-- 缩写 -->
<button :disabled="someDynamicCondition">Button</button>
```
v-on 缩写
```
<!-- 完整语法 -->
<a v-on:click="doSomething"></a>

<!-- 缩写 -->
<a @click="doSomething"></a>
```

## 计算属性
computed
计算属性的 getter 是干净无副作用的，因此也是易于测试和理解的。
```
var vm = new Vue({
  el: '#example',
  data: {
    a: 1
  },
  computed: {
    b: function () {
      return this.a + 1
    }
  }
})
```

### 计算属性 vs .$watch
Vue.js 提供了一个方法 $watch，它用于观察 Vue 实例上的数据变动。当一些数据需要根据其它数据变化时， $watch 很诱人 —— 特别是如果你来自 AngularJS。不过，通常更好的办法是**使用计算属性而不是一个命令式的  $watch 回调**。


### 计算 setter
计算 sett计算属性默认只是 getter，不过在需要时你也可以提供一个 setter：
```
computed: {
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
```
现在在调用 vm.fullName = 'John Doe' 时，setter 会被调用，vm.firstName 和 vm.lastName 也会有相应更新。

关于计算属性背后的原理和技术细节详见响应系统介绍中的具体章节。


## Class 与 Style 绑定
在 HTML 元素标签中，我们使用原生的 `class="container"` ，没有问题。
使用 vue 中的双大括号也是没问题的，`class="{{ wrap-head }}"`。
原生 class 与 v-bind:class 一起使用也是没有问题的，这也是我们推荐的方式。

原生 class 与 `class="{{ wrap-head }}"` 一起使用有问题。
v-bind:class 与 `class="{{ wrap-head }}"` 一起使用有问题。

``` 
<div class="static" v-bind:class="{ 'class-a': isA, 'class-b': isB }"></div>
data: {
  isA: true,
  isB: false
}
```
渲染为：
```
<div class="static class-a"></div>
```
当 isA 和 isB 变化时，class 列表将相应地更新。例如，如果 isB 变为 true，class 列表将变为 "static class-a class-b"。
你也可以直接绑定数据里的一个对象：
```
<div v-bind:class="classObject"></div>
data: {
  classObject: {
    'class-a': true,
    'class-b': false
  }
}
```


## 绑定内联样式
### 对象语法
v-bind:style 的对象语法十分直观——看着非常像 CSS，其实它是一个 JavaScript 对象。CSS 属性名可以用驼峰式（camelCase）或短横分隔命名（kebab-case）：
```
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>

<div v-bind:style="data"></div>
data: {
  activeColor: 'red',
  fontSize: 30
}
```
直接绑定到一个样式对象通常更好，让模板更清晰。
**对象语法常常结合返回对象的计算属性使用。** 这样就可以动态改变样式了。


### 数组语法
v-bind:style 的数组语法可以将多个样式对象应用到一个元素上：
```
<div v-bind:style="[styleObjectA, styleObjectB]">
```

### 自动添加前缀
当 v-bind:style 使用需要厂商前缀的 CSS 属性时，如 transform，Vue.js 会自动侦测并添加相应的前缀。


## 条件渲染
一般只用指令 v-if 、 v-show ，然后还可以夹杂一个 v-else 。

v-if 是一个指令，需要将它添加到一个元素上。但是如果我们想切换多个元素呢？此时我们可以把一个 <template> 元素当做包装元素，并在上面使用 v-if，最终的渲染结果不会包含它。

``` 
<template v-if="ok">
  <h1>Title</h1>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</template>
```

v-show 的值不管是 true 还是 false ，都会渲染，**v-show 是简单的切换元素的 CSS 属性 display。**

**注意 v-show 不支持 <template> 语法。**


**v-else 元素必须立即跟在 v-if 或 v-show 元素的后面——否则它不能被识别。**

## 列表渲染
v-for  item in items
在 v-for 块内我们能完全访问**父组件作用域内**的属性，另有一个特殊变量 $index。
**父组件作用域内**是什么意思？
```
var example2 = new Vue({
  el: '#example-2',
  data: {
    parentMessage: 'Parent',
    items: [
      { message: 'Foo' },
      { message: 'Bar' }
    ]
  }
})
```
```
<li v-for="item in items">
    {{ parentMessage }} - {{ $index }} - {{ item.message }}
</li>
```
父组件是 items ，父组件作用域就是 data ，所以它里面可以访问到 data 里面的字段属性值。

### 索引别名
```
<div v-for="(index, item) in items">
  {{ index }} {{ item.message }}
</div>
```
**从 1.0.17 开始，你也可以用 of 代替这个 in 。
```
<div v-for="item of items"></div>
```

### template v-for
类似于 template v-if，也可以将 v-for 用在 <template> 标签上，以渲染一个包含多个元素的块。
``` 
<ul>
  <template v-for="item in items">
    <li>{{ item.msg }}</li>
    <li class="divider"></li>
  </template>
</ul>
```

### 变异方法
Vue.js 包装了被观察数组的变异方法，故它们能触发视图更新。被包装的方法有：
push()、pop()、shfit()、unshift()、splice()、sort()、reverse()
### 替换数组
变异方法，如名字所示，修改了原始数组。相比之下，也有非变异方法，如 filter(), concat() 和 slice()，不会修改原始数组而是返回一个新数组。在使用非变异方法时，可以直接用新数组替换旧数组，**也能达到触发视图更新的效果。**

### track-by
有时需要用全新对象（例如通过 API 调用创建的对象）替换数组。因为 v-for 默认通过数据对象的特征来决定对已有作用域和 DOM 元素的复用程度，这可能导致重新渲染整个列表。但是，如果每个对象都有一个唯一 ID 的属性，便可以使用 track-by 特性给 Vue.js **一个提示**，Vue.js 因而能尽可能地复用已有实例。
如何给 vue 一个提示？
```
{
  items: [
    { _uid: '88f869d', ... },
    { _uid: '7496c10', ... }
  ]
}
```
然后
```
<div v-for="item in items" track-by="_uid">
  <!-- content -->
</div>
```
items 有什么字段可以用来 track-by 呢？类似于数据库中的主键。

### track-by $index
如果没有唯一的键供追踪，可以使用 track-by="$index"，它强制让 v-for 进入原位更新模式：片断不会被移动，而是简单地以对应索引的新值刷新。这种模式也能处理数据数组中重复的值。
这让数据替换非常高效。

### 问题
因为 JavaScript 的限制，Vue.js 不能检测到下面数组变化：

1.直接用索引设置元素，如 vm.items[0] = {}；
2.修改数据的长度，如 vm.items.length = 0。
为了解决问题 (1)，Vue.js 扩展了观察数组，为它添加了一个 $set() 方法：
```
// 与 `example1.items[0] = ...` 相同，但是能触发视图更新
example1.items.$set(0, { childMsg: 'Changed!'})
```
至于问题 (2)，只需用一个空数组替换 items。
除了 $set()， Vue.js 也为观察数组添加了 $remove() 方法，用于从目标数组中查找并删除元素，在内部它调用 splice() 。


### 对象 v-for
也可以使用 v-for 遍历对象。除了 $index 之外，作用域内还可以访问另外一个特殊变量 $key。
```
<li v-for="value in object">
  {{ $key }} : {{ value }}
</li>
// 你也可以提供一个别名
<li v-for="（key,val) in object">
    {{ key }} : {{ val }}
</li>
```

### 值域 v-for
v-for 也可以接收一个整数，此时它将重复模板数次。

### 显示过滤/排序的结果
原数据不变，显示过滤/排序过的数组，两个办法：
1、创建一个计算属性，返回过滤/排序过的数组；
2、使用内置的过滤器 filterBy 和 orderBy。


## 方法与事件处理器
v-on
v-on:click="greet"
v-on:click="say('what')"
类似于内联表达式，事件处理器限制为一个语句。

有时也需要在内联语句处理器中访问原生 DOM 事件。可以用特殊变量 $event 把它传入方法：
`v-on:click="say('hello!', $event)"`
为了解决这个问题，Vue.js 为 v-on 提供两个 事件修饰符：.prevent 与 .stop。你是否还记得修饰符是点号打头的指令后缀？
```
<!-- 阻止单击事件冒泡 -->
<a v-on:click.stop="doThis"></a>

<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>

<!-- 修饰符可以串联 -->
<a v-on:click.stop.prevent="doThat">

<!-- 只有修饰符 -->
<form v-on:submit.prevent></form>
```
1.0.16 添加了两个额外的修饰符：
```
<!-- 添加事件侦听器时使用 capture 模式 -->
<div v-on:click.capture="doThis">...</div>

<!-- 只当事件在该元素本身（而不是子元素）触发时触发回调 -->
<div v-on:click.self="doThat">...</div>
```


### 按键修饰符

Vue.js 允许为 v-on 添加按键修饰符：
```
<!-- 只有在 keyCode 是 13 时调用 vm.submit() -->
<input v-on:keyup.13="submit">
```
记住所有的 keyCode 比较困难，Vue.js 为最常用的按键提供别名：

全部的按键别名：

enter
tab
delete
esc
space
up
down
left
right

另外 1.0.8+ 也支持单字母按键别名。

当一个 ViewModel 被销毁时，所有的事件处理器都会自动被删除。你无须担心如何自己清理它们。


**每一个Vue实例除了能代理data中的字段属性外，还能代理methods中的字段属性。**
```
methods: {
    greet: function(e){
        alert('Hello' + this.name + '!');
        alert(e.target.tagName);
    }
}

```
`vm1.greet();`

## 表单
### 值绑定
对于单选按钮，勾选框及选择框选项，v-model 绑定的值通常是静态字符串（对于勾选框是逻辑值）。

但是有时我们想绑定值到 Vue 实例一个动态属性上。可以用 v-bind 做到。 而且 v-bind 允许绑定输入框的值到非字符串值。

```
<input
  type="checkbox"
  v-model="toggle"
  v-bind:true-value="a"
  v-bind:false-value="b">
```
理论上选中的时候 toggle 应该是 true ，没选中的时候 toggle 是 false 。但是使用了 v-bind:true 和 v-bind:false 后，选中后 toggle 的值是 data 中的 a 的值，没有选中就是 data 中 b 的值。


同理，Radio 也是这样：
```
<input type="radio" v-model="pick" v-bind:value="a">
```

v-bind:value = "{ number: 124}" 也是可以的。


### lazy
数据双向绑定是实时监听的，你可以添加一个特性 lazy，从而改到在 change 事件中同步。

### number
如果想自动将用户的输入保持为数字，可以添加一个特性 number：
`<input v-model="age" number>`


### debounce
debounce 设置一个最小的延时，在每次敲击之后延时同步输入框的值与数据。如果每次更新都要进行高耗操作（例如在输入提示中 Ajax 请求），它较为有用。
`<input v-model="msg" debounce="500">`


**注意 debounce 参数不会延迟 input 事件：它延迟“写入”底层数据。因此在使用 debounce 时应当用 vm.$watch() 响应数据的变化。若想延迟 DOM 事件，应当使用 debounce 过滤器。**









---
如果你比较细心的话，在数据还未加载完时是会有闪烁的情况出现，解决办法也很简单，使用v-cloak，然后定义css:
[v-cloak] { display: none}

---

vue-resource作为vue插件的形式存在，通过XMLHttpRequest 或 JSONP 发起请求并处理响应。在开发中也非常常见，现在我们用vue-resource来请求books：

