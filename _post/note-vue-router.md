# vue-router
```
// routes 是一个数组
const routes = [
  { path: '/foo', component: Foo }
]

const router = new VueRouter({
  routes
})

new Vue({
  router
})

```

# 动态路由匹配
```
{ path: '/user/:id', component: User }
```
现在呢，像 `/user/foo` 和 `/user/bar` 都将映射到相同的路由。

一个【路径参数】使用冒号 `:` 标记。当匹配到一个路由时，参数值会被设置到 `this.$route.params`，可以在每个组件内使用。于是，我们可以更新 `User` 的模板，输出当前用户的 ID。

|模式|匹配路径|$route.params|
|:-:|:-:|:-:|
|`/user/:username/post/:post_id`|`/user/evan/post/123`| `{ username: 'evan', post_id: 123}`|

除了 `$route.param` 外，`$route` 对象还提供了其它有用的信息，例如，`$route.query` （如果 URL 中有查询参数）、`$route.hash` 等等。

那么，一个 `$route` 对象到底有哪些方法呢？看下面的扩展

## 扩展
一个 **route object（路由信息对象）**表示当前激活的路由的状态信息，包含了当前 URL 解析得到的信息，还有 URL 匹配到的 **route records（路由记录）**。
route object 是 immutable（不可变）的，每次成功的导航后都会产生一个新的对象。

### 路由信息对象的属性
那么一个路由信息对象有哪些属性呢？
[https://router.vuejs.org/zh-cn/api/route-object.html](https://router.vuejs.org/zh-cn/api/route-object.html)

# 响应路由参数的变化
提醒一下，当使用路由参数时，例如从 `/user/foo` 导航到 `user/bar`，**原来的组件实例会被复用**。因为两个路由都渲染同个组件，比起销毁再创建，复用则显得更加高效。**不过，这也意味着组件的生命周期钩子不会再被调用**。

那么，我们在复用组件时，想对路由参数的变化作出响应的话，你可以简单地 watch（监测变化） `$route` 对象，或者使用 2.2 中引入的 `beforeRouteUpdate` 守卫。

# 嵌套路由
1. 要注意，以 `/` 开头的嵌套路径会被当做根路径。这让你充分的使用嵌套组件而无须设置嵌套的路径。

2. 空的子路由可以用来做没有匹配到合适的子路由页面。


# 编程式的导航
```
router.push(location, onComplete?, onAbort?)
```
**注意：在 Vue 实例内部，你可以通过 `$router` 访问路由实例。因此你可以调用 `this.$router.push` 。**

[https://router.vuejs.org/zh-cn/essentials/navigation.html](https://router.vuejs.org/zh-cn/essentials/navigation.html)

**注意：**如果目的地和当前路由相同，只有参数发生了变化（比如从一个用户资料到另一个 `/users/1` -> `users/2` ），你需要使用 `beforeRouteUpdate` 来响应这个变化（比如抓取用户信息）。

## router.replace
```
router.replace(location, onComplete?, onAbort?)
```
跟 `router.push` 很像，唯一的不同就是，它不会向 history 添加新记录，而是跟它的方法名一样 —— 替换掉当前的 history 记录。

|**声明式**|**编程式**|
|:-:|:-:|
|`<router-link :to="..." replace`|`router.replae(...)`|

```
router.go(n)
```


# 命名路由
为了更方便，你可以在创建 Router 实例的时候，在 `routes` 配置中给某个路由设置名称。

用例：
```
<router-link :to="{name: 'user', params: { userId: 123 }}">User</router-link>
```
```
router.push({name: 'user', params: { userId: 123 }})
```

# 命名视图
有时候想同时（同级）展示多个视图，而不是嵌套展示，例如创建一个布局，有 `sidebar`（侧导航）和 `main`（主内容）两个视图，这个时候命名视图就派上用场了。你可以在界面中拥有多个单独命名的视图，而不是只有一个单独的出口。如果 `router-view` 没有设置名字，那么默认为 `default`。

因此对于同个路由，多个视图就需要多个组件。确保正确使用 components 配置（带上 s）：

```
<router-view class="view one"></router-view>
<router-view class="view two" name="a"></router-view>

const router = new VueRouter({
  routes: [
    {
      path: '/',
      components: {
        default: Foo,
        a: Bar,
        b: Baz
      }
    }
  ]
})
```

# 重定向和别名

## 重定向（redirect)
```
// 1
{ path: '/a', redirect: '/b' }
// 2
{ path: '/a', redirect: { name: 'foo' }}
// 甚至是一个方法，动态返回重定向目标：
{ path: '/a', redirect: to => {
  // 方法接收 目标路由 作为参数
  // return 重定向的字符串路径/路径对象
}}
```

## 别名
`/a` 的别名是 `/b`，意味着，当用户访问 `/b` 时，URL 会保持为 `/b`，但是路由匹配则为 `/a`，就像用户访问 `/a` 一样。

『别名』的功能让你可以自由地将 UI 结构映射到任意的 URL，而不是受限于配置的嵌套路由结构。


# 路由组件传参
使用 `props` 将组件和路由解耦
```
{ path: '/user/:id', component: User, props: true }
```

这样你便可以在任何地方使用该组件，使得该组件更易于重用和测试。

- 布尔模式（props被设置为true）
- 对象模式（如果props是一个对象）
- 函数模式（你可以创建一个函数返回props）


# 导航守卫
植入路由导航有哪几种途径：
全局的、单个路由独享的、组件级的

记住 **参数或查询的改变并不会触发进入/离开的导航守卫**。
和 响应路由参数的变化 中的组件会复用一样，我们可以通过 观察$route对象 来应对这些变化，或者使用 2.2 中引入的 `beforeRouteUpdate` 的组件内守卫。

## 全局守卫
可以使用 `router.beforeEach` 注册一个全局前置守卫。
```
router.beforeEach((to, from, next) => {
  // ...
})
```
要点：
1、当一个导航触发时，全局前置守卫按照创建顺序调用。守卫是异步解析执行，此时导航在所有守卫 resolve 完之前一直处于 **等待中**。
2、`next: Function:` 一定要调用该方法来 `resolve` 这个钩子。执行效果依赖 `next` 方法的调用参数。
`next` 的四种状态：

- `next()` ：这种无参的，就直接进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed （确认的）。
- `next(false)` ： 中断当前的导航。如果浏览器额 URL 改变了（可能是用户手动或者浏览器后退按钮），那么 URL 地址会重置到 `from` 路由对应的地址。
- `next('/') 或者 next({ path: '/'})` ： 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的盗汗。
- `next(error)` ：(2.4.0+)如果传入 `next` 的参数是一个 `Error` 实例，则导航会被终止且该错误会被传递给 `router.onError()` 注册过的回调。

重点就是：**确保要调用 `next` 方法，否则钩子就不会被resolved。**

## 全局解析守卫
在 2.5.0+ 你可以用 `router.beforeResolve` 注册一个全局守卫。这和 `router.beforeEach` 类似，区别是在导航被确认之前，
**同时在所有组件内守卫和异步路由组件被解析之后 **
解析守卫就被调用。

## 全局后置钩子
和守卫不同的是，这些钩子不会接受 `next` 函数也不会改变导航本身：
```
router.afterEach((to, from) => {
  // ...
})
```

## 路由独享的守卫
这个守卫是定义在某个路由里的。
在路由配置上直接定义 `beforeEnter` 守卫

## 组件内的守卫
最后，你可以在路由组件内直接定义以下路由导航守卫：
```
beforeRouterEnter
beforeRouteUpdate(2.2新增)
beforeRouteLeave
```
要点：
1、`beforeRouteEnter` 守卫不能访问 `this`，因为守卫在导航确认前被调用，因此即将登场的新组件还没被创建。
不过，你可以通过传一个回调给`next`来访问组件实例。在导航被确认的时候执行回调，并且把组件实例作为回调方法的参数。
```
beforeRouteEnter(to, from, next) {
  next(vm => {
    // 通过 `vm` 访问组件实例
  })
}
```
你可以在 `beforeRouteLeave` 中直接访问`this`。这个离开守卫通常用来禁止用户在还未保存修改前突然离开。可以通过`next(false)`来取消导航。

## 完整的导航解析流程
详情看官方文档：[https://router.vuejs.org/zh-cn/advanced/navigation-guards.html](https://router.vuejs.org/zh-cn/advanced/navigation-guards.html)

# 路由元信息

`/foo/bar` 这个 URL 将会匹配父路由记录以及子路由记录。
一个路由匹配到的所有路由记录会暴露为 `$route` 对象（还有在导航守卫中的路由对象）的 `$route.matched` 数组。因此，我们需要遍历 `$route.matched` 来检查路由记录中的 `meta` 字段。


# 过渡动画效果
```
<transition>
  <router-view></router-view>
</transition>
```

## 单个路由的过渡
上面的用法会给所有路由设置一样的过渡效果，如果你想让每个路由组件有各自的过渡效果，可以在各路由组件内使用 `<transition>` 并设置不同的 `name` 。

### 基于路由的动态过渡
还可以基于当前路由与目标路由的变化关系，动态设置过渡效果。
```
<!-- 使用动态的 transition name -->
<transition :name="transitionName">
  <router-view></router-view>
</transition>
```

# 数据获取
进入某个路由后，需要从服务器获取数据。例如，在渲染用户信息时，你需要从服务器获取用户的数据。我们可以通过两种方式来实现：

- 导航完成之后获取：先完成导航，然后在接下来的组件生命周期钩子中获取数据。在数据获取期间显示【加载中】之类的提示。
- 导航完成之前获取：导航完成前，在路由进入的守卫中获取数据，在数据获成功后执行导航。（在为后面的视图获取数据时，用户会停留在当前的界面，因此建议在数据获取期间，显示一些进度条或者别的提示。如果数据获取失败，同样有必要展示一些全局的错误提醒）

# 滚动行为
注意：这个功能只在 HTML5 history 模式下使用
当创建一个 Router 实例，你可以提供一个 `scrollBehavior` 方法
```
const router = new VueRouter({
  routes: [...],
  scrollBehavior(to, from, savePosition) {
    // return 期望滚动到哪个位置
  }
})
```

如果你要模拟【滚动到锚点】的行为：
```
scrollBehavior(to, from, savedPosition) {
  if(to.hash) {
    return {
      selector: to.hash
    }
  }
}
```
我们还可以利用[路由元信息](https://router.vuejs.org/zh-cn/advanced/meta.html)更细颗粒度的控制滚动，详情看文档[https://router.vuejs.org/zh-cn/advanced/scroll-behavior.html](https://router.vuejs.org/zh-cn/advanced/scroll-behavior.html)

# 路由懒加载
如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了。





