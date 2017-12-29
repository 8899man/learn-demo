# vuex

当我们的应用遇到多个组件共享状态时，单向数据流的简洁性很容易被破坏：

- 多个视图依赖于同一状态
- 来自不同视图的行为需要变更同一状态。

对于问题一，传参的方法对于多层嵌套的组件将会非常繁琐，并且对于兄弟组件间的状态传递无能为力。
对于问题二，我们经常会采用父子组件直接引用或者通过事件来变更和同步状态的多份拷贝。
以上的这些模式非常脆弱，通常会导致无法维护的代码。

vuex 和单纯的全局对象有以下两点不同：
1、Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么响应的组件也会相应地得到高效更新。
2、你不能直接改变 store 中的状态。改变 store 中的状态的唯一途径就是显示的提交(commit)mutation。这样使得我们可以方便地跟踪每一个状态的变化，从而让我们能够实现一些工具帮助我们更好地了解我们的应用。

一个基础的 store。仅需要提供一个初始 state 对象和一些 mutation：
```
// 如果在模块化构建系统中，请确保在开头调用了 Vue.use(vuex)
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment(state) {
      state.count++
    }
  }
})
```

现在，你可以通过 `store.state` 来获取状态对象，以及通过 `store.commit` 方法触发状态变更：
```
store.commit('increment')
console.log(store.state.count)
```

由于 store 中的状态是响应式的，在组件中调用 store 中的状态简单到仅需要在 **计算属性中**返回即可。（这个很关键，这个也是为什么我们总是在 计算属性 中调用 vuex中的state的原因）。
触发变化也仅仅是在组件的 `methods` 中提交 `mutation` 。

# Vuex 的核心概念
```
State
Getter
Mutation
Action
Module
```

# State
【单一状态树】
Vuex使用**单一状态树**，它作为一个“唯一数据来源（SSOT）”而存在。
这也意味着，每个应用将仅仅包含一个 store 实例。

单状态树和模块化并不冲突——在后面的章节里我们会讨论如何将状态和状态变更事件分布到各个子模块中。

【在 Vue 组件中获得 Vuex 状态】
最简单的方式就是在**计算属性**中返回某个状态：
```
computed: {
  count() {
    return store.state.count
  }
}
```

然而，这种模式导致组件依赖全局状态单例。在模块化的构建系统中，在每个需要使用 state 的组件中需要频繁地导入，并且在测试组件时需要模拟状态。

所以，我们要搞成全局的。

Vuex 通过 `store` 选项，提供了一种机制将状态从根组件“注入”到每一个子组件中（需调用 `Vue.use(Vuex)`）：
在 new Vue 实例的时候传入 store 

通过在根实例中注册 `store` 选项，该 `store` 实例会注入到根组件下的所有子组件中，且子组件能通过 `this.$store` 访问到。

## mapState 辅助函数
```
// 在单独构建的版本中辅助函数为 Vuex.mapState
import { mapState } from 'vuex'

export default {
  computed: mapState({
    // 箭头函数可使代码更简练
    count: state => state.count,
    // 传字符串参数 'count' 等同于 `state => state.count`
    countAlias: 'count',
    // 为了能够使用 `this` 获取局部状态，必须使用常规函数
    countPlusLocalState(state) {
      return state.count + this.localCount
    }
  })
}

// 当映射的计算属性的名称与 state 的子节点名称相同时，我们也可以给 `mapState` 传一个字符串数组
computed: mapState([
  // 映射 this.count 为 store.state.count
  'count'
])
```

【对象展开运算符】
vue中的computed属性是一个对象。
`mapState`函数返回的是一个对象。
所以：computed后面可以直接使用mapState函数。
如果我们还有局部计算属性呢
我们如何将它与局部计算属性混合使用呢？
通常，我们需要使用一个工具函数将多个对象合并为一个，以使我们可以将最终对象传给 `computed` 属性。但是自从有了 **对象展开运算符** ,我们可以极大地简化写法：
```
computed: {
  localComputed() { /* ... */},
  ...mapState({
    // ...
  })
}
```

【组件仍然保有局部状态】
使用 Vuex 并不意味着你需要将**所有的**状态放入 Vuex。
虽然将所有的状态放到 Vuex 会使状态变化更显式和易调试，但也会使代码变得冗长和不直观。
如果有些状态严格属于单个组件，最好还是作为组件的局部状态。
你应该根据你的应用开发需要进行权衡和确定。

# Getter
Vuex 允许我们在 store 中定义“getter”（可以认为是 store 的计算属性）。就像计算属性一样，getter的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。
