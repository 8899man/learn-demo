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

### computed vs methods
我们可以使用 methods 来替代 computed，效果上两个都是一样的，但是 computed 是基于它的依赖缓存，只有相关依赖发生改变时才会重新取值。而使用 methods ，在重新渲染的时候，函数总会重新调用执行。

可以说使用 computed 性能会更好，但是如果你不希望缓存，你可以使用 methods 属性。


# 实例生命周期
在实例生命周期的不同阶段调用。如 created、 mounted、 updated、 destroyed 。

# 生命周期图示
![vue2生命周期](./vue2-lifecycle.png)


## `v-for` with `v-if`
当它们处于同一节点， v-for 的优先级比 v-if 更高，这意味着 v-if 将分别重复运行于每个 v-for 循环中。当你想为仅有的 一些 项渲染节点时，这种优先级的机制会十分有用，如下：


