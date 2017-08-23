Vue 2.x

### v-for 迭代对象
v-for 可以通过一个对象的属性来迭代数据：
```
<div id="app">
  <ul>
    <li v-for="value in object">
    {{ value }}
    </li>
  </ul>
</div>
 
<script>
new Vue({
  el: '#app',
  data: {
    object: {
      name: '菜鸟教程',
      url: 'http://www.runoob.com',
      slogan: '学的不仅是技术，更是梦想！'
    }
  }
})
</script>
```

你也可以提供第二个的参数为键名：
```
<li v-for="(value, key) in object">
```

第三个参数为所以：
```
<li v-for="(value, key, index) in object">
```

你也可以用 of 替代 in 作为分隔符，因为它是最接近 JavaScript 迭代器的语法。
```
<div v-for="item of items"></div>
```


### computed vs methods
我们可以使用 methods 来替代 computed，效果上两个都是一样的，但是 computed 是基于它的依赖缓存，只有相关依赖发生改变时才会重新取值。而使用 methods ，在重新渲染的时候，函数总会重新调用执行。

可以说使用 computed 性能会更好，但是如果你不希望缓存，你可以使用 methods 属性。


# 实例生命周期
在实例生命周期的不同阶段调用。如 created、 mounted、 updated、 destroyed 。

# 生命周期图示
![vue2生命周期](./vue2-lifecycle.png)

## 组件和 `v-for`
2.2.0+ 的版本里，当在组件中使用 `v-for` 时，`key` 现在是必须的。


## `v-for` with `v-if`
当它们处于同一节点， v-for 的优先级比 v-if 更高，这意味着 v-if 将分别重复运行于每个 v-for 循环中。当你想为仅有的 一些 项渲染节点时，这种优先级的机制会十分有用，如下：


## `key`
当 Vue.js 用 v-for 正在更新已渲染过的元素列表时，它默认用 “就地复用” 策略。如果数据项的顺序被改变，Vue将不是移动 DOM 元素来匹配数据项的顺序， 而是简单复用此处每个元素，并且确保它在特定索引下显示已被渲染过的每个元素。这个类似 Vue 1.x 的 `track-by="$index"` 。

建议尽可能使用 v-for 来提供 key ，除非迭代 DOM 内容足够简单，或者你是故意要依赖于默认行为来获得性能提升。


# 数据更新检测

## 变异方法
push()、pop()、shift()、unshift()、splice()、sort()、reverse()。
这些方法会改变原数组，触发视图更新。

## 重塑数组
filter()、concat()、slice()
非变异方法，不会改变原始数组（不会触发视图更新），但总返回一个新数组。
当使用非变异方法时，可以用新数组替换旧数组，来触发视图更新。

你可能认为这将导致 Vue 丢弃现有 DOM 并重新渲染整个列表。幸运的是，事实并非如此。 Vue 实现了一些智能启发式方法来最大化 DOM 元素重用，所以用一个含有相同元素的数组去替换原来的数组是非常高效的操作。

# 事件处理器
有时也需要在内联语句处理器中访问原生 DOM 事件。可以用特殊变量 $event 把它传入方法：
```
<button v-on:click="warn('Form cannot be submitted yet.', $event)">
  Submit
</button>

// ...
methods: {
  warn: function (message, event) {
    // 现在我们可以访问原生事件对象
    if (event) event.preventDefault()
    alert(message)
  }
}

```

## 事件修饰符
```
<!-- 阻止单击事件冒泡 -->
<a v-on:click.stop="doThis"></a>
<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>
<!-- 修饰符可以串联  -->
<a v-on:click.stop.prevent="doThat"></a>
<!-- 只有修饰符 -->
<form v-on:submit.prevent></form>
<!-- 添加事件侦听器时使用事件捕获模式 -->
<div v-on:click.capture="doThis">...</div>
<!-- 只当事件在该元素本身（比如不是子元素）触发时触发回调 -->
<div v-on:click.self="doThat">...</div>
```
**注意：**
```
使用修饰符时，顺序很重要；相应的代码会以同样的顺序产生。因此，用 @click.prevent.self 会阻止所有的点击，而 @click.self.prevent 只会阻止元素上的点击。
```
**2.1.1 新增**
```
!-- 点击事件将只会触发一次 -->
<a v-on:click.once="doThis"></a>
```

## 键值修饰符
```
<!-- 只有在 keyCode 是 13 时调用 vm.submit() -->
<input v-on:keyup.13="submit">
```
Vue 为最常用的按键提供了别名：
```
.enter
.tab
.delete (捕获 “删除” 和 “退格” 键)
.esc
.space
.up
.down
.left
.right
```
当然，可以通过全局 config.keyCodes 对象自定义键值修饰符别名：
```
// 可以使用 v-on:keyup.f1
Vue.config.keyCodes.f1 = 112
```

## 修饰键
```
.ctrl
.alt
.shift
.meta
```
例：
```
<!-- Alt + C -->
<input @keyup.alt.67="clear">
<!-- Ctrl + Click -->
<div @click.ctrl="doSomething">Do something</div>
```
**注意：**
```
修饰键比正常的按键不同；修饰键和 keyup 事件一起用时，事件引发时必须按下正常的按键。换一种说法：如果要引发 keyup.ctrl，必须按下 ctrl 时释放其他的按键；单单释放 ctrl 不会引发事件。
```

# 组件
**组件是Vue中很重要的一块**，有必要在这里回顾一点 vue1.x 中组件。


## DOM 模版解析说明
当使用 DOM 作为模版时 (例如，将 el 选项挂载到一个已存在的元素上), 你会受到 HTML 的一些限制，因为 Vue 只有在浏览器解析和标准化 HTML 后才能获取模版内容。尤其像这些元素 <ul>，<ol>，<table>，<select> 限制了能被它包裹的元素，而一些像 <option> 这样的元素只能出现在某些其它元素内部。

在自定义组件中使用这些受限制的元素时会导致一些问题，例如：
```
<table>
  <my-row>...</my-row>
</table>
```
自定义组件 <my-row> 被认为是无效的内容，因此在渲染的时候会导致错误。变通的方案是使用特殊的 is 属性：
```
<table>
  <tr is="my-row"></tr>
</table>
```

**应当注意，如果你使用来自以下来源之一的字符串模板，这些限制将不适用：**
- `<script type="text/x-template">`
- JavaScript 内联模板字符串
- `.vue` 组件

因此， 有必要的话请使用字符串模板。

# 构成组件
在 Vue 中，父子组件的关系可以总结为 props down, events up。父组件通过 props 向下传递数据给子组件，子组件通过 events 给父组件发送消息。

## camelCase vs. kebab-case
HTML 特性是不区分大小写的。所以，当使用的不是字符串模版，camelCased (驼峰式) 命名的 prop 需要转换为相对应的 kebab-case (短横线隔开式) 命名：
```
Vue.component('child', {
  // camelCase in JavaScript
  props: ['myMessage'],
  template: '<span>{{ myMessage }}</span>'
})

!-- kebab-case in HTML -->
<child my-message="hello!"></child>
```



prop 是单向绑定的：当父组件的属性变化时，将传导给子组件，但是不会反过来。这是为了防止子组件无意修改了父组件的状态——这会让应用的数据流难以理解。
另外，每次父组件更新时，子组件的所有 prop 都会更新为最新值。这意味着你不应该在子组件内部改变 prop。如果你这么做了，Vue 会在控制台给出警告。

注意在 JavaScript 中对象和数组是引用类型，指向同一个内存空间，如果 prop 是一个对象或数组，在子组件内部改变它会影响父组件的状态。


# 自定义事件
子组件怎么跟父组件通信呢？这个时候 Vue 的自定义事件系统就派得上用场了。

## 使用 v-on 绑定自定义事件
每个 Vue 实例都实现了 事件接口，即：
- 使用 `$on(eventName)` 监听事件
- 使用 `$emit(eventName)` 触发事件

# 给组件绑定原生事件
有时候，你可能想在某个组件的根元素上监听一个原生事件。可以使用 .native 修饰 v-on。例如：
```
<my-component v-on:click.native="doTheThing"></my-component>
```

# .sync 修饰符
> 2.3.0+

在一些情况下，我们可能会需要对一个 prop 进行『双向绑定』。事实上，这正是 Vue 1.x 中的 .sync修饰符所提供的功能。当一个子组件改变了一个 prop 的值时，这个变化也会同步到父组件中所绑定的值。这很方便，但也会导致问题，因为它破坏了『单向数据流』的假设。由于子组件改变 prop 的代码和普通的状态改动代码毫无区别，当光看子组件的代码时，你完全不知道它何时悄悄地改变了父组件的状态。这在 debug 复杂结构的应用时会带来很高的维护成本。
上面所说的正是我们在 2.0 中移除 .sync 的理由。但是在 2.0 发布之后的实际应用中，我们发现 .sync 还是有其适用之处，比如在开发可复用的组件库时。我们需要做的只是**让子组件改变父组件状态的代码更容易被区分**。

从 2.3.0 起我们重新引入了 .sync 修饰符，但是这次它只是作为一个编译时的语法糖存在。它会被扩展为一个自动更新父组件属性的 v-on 侦听器。

如下代码：
```
<comp :foo.sync="bar"></comp>
```

会被扩展为：
```
<comp :foo="bar" @update:foo="val => bar = val"></comp>
```

当子组件需要更新 foo 的值时，它需要显式地触发一个更新事件：
```
this.$emit('update:foo', newValue);
```


# 定制组件的 v-model
> 2.2.0 新增


# 组件命名约定
在注册组件（或者 props）时，三种命名方式，随便用，都可以，无所谓， kebab-case、camelCase、PascalCase。
但是在使用的时候，请使用 kebab-case 形式：
```
// 在组件定义中
components: {
  // 使用 kebab-case 形式注册
  'kebab-cased-component': { /* ... */ },
  // register using camelCase
  'camelCasedComponent': { /* ... */ },
  // register using PascalCase
  'PascalCasedComponent': { /* ... */ }
}

<!-- 在HTML模版中始终使用 kebab-case -->
<kebab-cased-component></kebab-cased-component>
<camel-cased-component></camel-cased-component>
<pascal-cased-component></pascal-cased-component>
```

当使用字符串模式时，可以不受 HTML 的 case-insensitive 限制。这意味实际上在模版中，你可以使用下面的方式来引用你的组件：
- kebab-case
- camelCase 或 kebab-case 如果组件已经被定义为 camelCase
- kebab-case 、 camelCase 或 PascalCase 如果组件已经被定义为 PascalCase 。

可以看出，这里好像有一种大小关系在里面：
PascalCase > camelCase > kebab-case

```
components: {
  'kebab-cased-component': { /* ... */ },
  camelCasedComponent: { /* ... */ },
  PascalCasedComponent: { /* ... */ }
}

<kebab-cased-component></kebab-cased-component>
<camel-cased-component></camel-cased-component>
<camelCasedComponent></camelCasedComponent>
<pascal-cased-component></pascal-cased-component>
<pascalCasedComponent></pascalCasedComponent>
<PascalCasedComponent></PascalCasedComponent>
```

这意味着 PascalCase 是最通用的 声明约定 而 kebab-case 是最通用的 使用约定。

**关于命名约定以及kebab-cae，camelCase, pascalCase 的个人理解：**
```
//组件
Vue.component('ButtonCounter', {
  template: '<button v-on:click="incrementCounter">{{ counter }}</button>',
});
```
以这样一个组件为例，在 html 中使用的时候，只能用 kebab-case 形式：
```
<button-counter></button-couter>
```
但是如果使用字符串模板时，则不受 HTML 的 case-insensitive 限制。什么意思呢？
同样对于上面定义的那个组件，在字符串模板中，可以有三种调用方式：
```
new Vue({
  components: {
    yu: {
      template: '<button-counter></button-counter>'
    },
    sp: {
      template: '<buttonCounter></buttonCounter>'
    },
    oq: {
      template: '<ButtonCounter></ButtonCounter>'
    }

  }

});




