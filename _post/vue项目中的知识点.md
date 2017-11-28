1.
两个路由对应同一个component，默认情况下当这两个页面切换时并不会触发vue的created或者mounted钩子，官方说你可以通过watch $route的变化来做处理，但其实说真的还是蛮麻烦的。后来发现其实可以简单的在router-view上加上一个唯一的key，来保证路由切换时都会重新渲染触发钩子了。这样简单的多了：
```
<router-view :key="key"></router-view>
computed: {
  key() {
    return this.$route.name !== undefined ? this.$route.name + + new Date(): this.$route + + new Date()
  }
}
```

2.
主站PC站基于 nodejs 、Vue实现服务端渲染，所以不仅需要依赖nodejs，而且需要利用pm2进行nodejs生命周期的管理。为了加速线上镜像构建的速度，我们利用taobao源[https://registry.npm.taobao.org](https://registry.npm.taobao.org)进行加速，并且将一些常见的npm依赖打入了基础镜像，避免每次都需要重新下载。

3.
这里注意下建议不要使用 cnpm install 或者 update 它的包都是一个link，这里建议这样使用
```
npm install --registry=https://registry.npm.taobao.org
```

4.如果你想把一个对象的所有属性作为 prop 进行传递，可以使用不带任何参数的 v-bind (即用 v-bind 而不是 v-bind:prop-name)。例如，已知一个 todo 对象：
```
todo: {
  text: 'Learn Vue',
  isComplete: false
}
```
然后：
```
<todo-item v-bind="todo"></todo-item>
```
将等价于：
```
<todo-item
  v-bind:text="todo.text"
  v-bind:is-complete="todo.isComplete"
></todo-item>
```

5.字面量语法 vs 动态语法
初学者常犯的一个错误是使用字面量语法传递数值：
```
<!-- 传递了一个字符串 "1" -->
<comp some-prop="1"></comp>
```
因为它是一个字面量 prop，它的值是字符串 "1" 而不是一个数值。如果想传递一个真正的 JavaScript 数值，则需要使用 v-bind ，从而让它的值被当作 JavaScript 表达式计算：
```
<!-- 传递真正的数值 -->
<comp v-bind:some-prop="1"></comp>
```

6. 单向数据流（prop）
在两种情况下，我们很容易忍不住想去修改 prop 中数据：
  1).Prop 作为初始值传入后，子组件想把它当作局部数据来用；
  2).Prop 作为原始数据传入，由子组件处理成其它数据输出。
对这两种情况，正确的应对方式是：
  1).定义一个局部变量，并用 prop 的值初始化它：
```
props: ['initialCounter'],
data: function () {
  return { counter: this.initialCounter }
}
```
  2).定义一个计算属性，处理 prop 的值并返回：
```
props: ['size'],
computed: {
  normalizedSize: function () {
    return this.size.trim().toLowerCase()
  }
}
```

>注意在 JavaScript 中对象和数组是引用类型，指向同一个内存空间，如果 prop 是一个对象或数组，在子组件内部改变它会影响父组件的状态

7.
为了保证安全性，我司现在后台所有token有效期(Expires/Max-Age)都是Session，就是当浏览器关闭了就丢失了。重新打开游览器都需要重新登录验证，后端也会在每周固定一个时间点重新刷新token，让后台用户全部重新登录一次，确保后台用户不会因为电脑遗失或者其它原因被人随意使用账号。

8.
不同路由对应同一个页面的视图刷新问题？
```
{ path: 'create', component: PostCreate, name: '发表文章' },
{ path: 'edit/:Id(\\d+)', component: PostCreate, name: '编辑文章' }
```
我们创建和编辑的页面使用的是同一个component，默认情况下当这两个页面切换时并不会触发 vue 的 created 或者 mounted 钩子，官方说你可以通过 watch $route 的变化来做处理，但其实说真的还是蛮麻烦的。后来发现其实可以简单的在 router-view 上加上一个唯一的 key ，来保证路由切换时都会重新渲染触发钩子。
```
<router-view :key="key"></router-view>

computed: {
  key() {
    return this.$route.name !== undefined ? this.$route.name + + new Date(): this.$route + + new Date()
  }
}
```

9.
而且我觉得其实前端真正需要按钮级别判断的地方不是很多，如果一个页面有很多种不同权限的按钮，我觉得更多的应该是考虑产品层面是否设计合理。

10.
我们可以将同一函数定义为一个方法而不是一个计算你属性。两种方式的最终结果确实是完全相同的。然而，不同的是 **计算属性是基于它们的依赖进行缓存的**。计算属性只有在它的相关依赖发生改版时才会重新求值。这就意味着只要 `message` 还没有发生改变，多次访问 `reversedMessage` 计算属性会立即返回之前的计算结果，而不必再次执行函数。
这也同样意味着下面的计算属性将不会更新，因为 `Date.now()` 不是响应式依赖：
```
computed: {
  now: function() {
    return Date.now()
  }
}
```
相比之下，每当触发重新渲染时，*调用方法* 将 **总会**再次执行函数。

> 那么，我的理解是：如果你希望每次拿到的值都是更新过的（都是--force），那么你应该使用 方法 而不是 计算属性。

我们为什么需要缓存？假设我们有一个性能开销比较大的的计算属性 A，它需要遍历一个巨大的数组并做大量的计算。然后我们可能有其他的计算属性依赖于 A 。如果没有缓存，我们将不可避免的多次执行 A 的 getter！**如果你不希望有缓存，请用方法来替代。**














