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

|模式|匹配路径|$route.params|
|:-:|:-:|:-:|
|`/user/:username/post/:post_id`|`/user/evan/post/123`| `{ username: 'evan', post_id: 123}`|

除了 `$route.param` 外，`$route` 对象还提供了其它有用的信息，例如，`$route.query` （如果 URL 中有查询参数）、`$route.hash` 等等。

## 扩展
一个 **route object（路由信息对象）**表示当前激活的路由的状态信息，包含了当前 URL 解析得到的信息，还有 URL 匹配到的 **route records（路由记录）**。
route object 是 immutable（不可变）的，每次成功的导航后都会产生一个新的对象。

### 路由信息对象的属性
那么一个路由信息对象有哪些属性呢？
[https://router.vuejs.org/zh-cn/api/route-object.html](https://router.vuejs.org/zh-cn/api/route-object.html)

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








