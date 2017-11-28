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

