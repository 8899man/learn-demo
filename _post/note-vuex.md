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
Vuex 允许我们在 store 中定义“getter”（可以认为是 store 的计算属性）。就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。

Getter 会暴露为 `store.getters` 对象：
```
store.getters.doneTodos  // -> [{id:1,text:'...',done:true}]
```

【Getter也可以接受其他getter作为第二个参数】
```
getters: {
  doneTodosCount: (state, getters) => {
    return getters.doneTodos.length
  }
}
store.getters.doneTodosCount  // -> 1
```

我们可以很容易地在任何组件中使用它：
```
computed: {
  doneTodosCount() {
    return this.$store.getters.doneTodosCount
  }
}
```

你也可以通过让 getter 返回一个函数，来实现给 getter 传参。在你对 store 里的数组进行查询时非常有用。

## 【mapGetters 辅助函数】
`mapGetters` 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性。
```
computed: {
// 使用对象展开运算符将 getter 混入 computed 对象中
  ...mapGetters([
    'doneTodosCount',
    'anotherGetter',
    // ...
  ])
}
```
如果你想将一个 getter 属性另取一个名字，是用对象形式：
```
mapGetters({
  // 映射 `this.doneCount` 为 `store.getters.doneTodosCount`
  doneCount: 'doneTodosCount'
})
```

# Mutation
更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。
Vuex 中的 mutation 非常类似于事件：每个 mutation 都有一个字符串的 **事件类型（type）** 和一个 **回调函数（handler）** 。这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数：
```
mutations: {
  increment(state) {
    // 变更状态
    state.count++
  }
}

// OR

mutations: {
  SET_CODE: (state, code) => {
    state.code = code
  }
}
```

你不能直接调用一个 mutation handler。这个选项更像是事件注册：“当触发一个类型为 `increment` 的 mutation 时，调用次函数。”要唤醒一个 mutation handler，你需要以相应的 type 调用 store.commit 方法：
```
store.commit('increment')
```

## 【提交载荷(Payload)】
你可以向 `store.commit` 传入额外的参数，即 mutation 的 **载荷(payload)**
```
mutations: {
  increment(state, n) {
    state.count += n
  }
}

store.commit('increment', 10)
```

说白了，就是额外的参数，为什么要叫 **载荷(payload)**

这个 **载荷(payload)** 可以是任意值，大多数情况下，载荷应该是一个对象，这样可以包含多个字段并且记录的 mutation 会更易读。具体看你怎么设计，怎么用了，如果你 mutations 的粒度比较小的话，载荷应该是一个单一的值。

## 【对象风格的提交方式】
```
store.commit({
  type: 'increment',
  amount: 10
})
```


## 【Mutation 需遵守 Vue 的响应规则】
既然 Vuex 的 store 中的状态是响应式的，那么当我们变更状态时，监视状态的 Vue 组件也会自动更新。这也意味着 Vuex 中的 mutation 也需要与使用 Vue 一样遵守一些注意事项：

1、最好提前在你的 store 中初始化好所有所需属性。（位了响应式）
2、当需要在对象上添加新属性时，你应该

- 使用 `Vue.set(obj, 'newProp', 123)`，
- 或者
- 以新对象替换老对象。例如，利用 stage-3的对象展开运算符
```
state.obj = { ...state.obj, newProp: 123}
```

## 【使用常量替代  Mutation 事件类型】

## 【Mutation 必须是同步函数】
一条重要的原则就是要记住 mutation 必须是同步函数。
【实质上、任何在回调函数中进行的状态的改变都是不可追踪的。】

## 【在组件中提交 Mutation】
你可以在组件中使用 `this.$store.commit('xxx')` 提交 mutation，或者使用 `mapMutations` 辅助函数将组件中的 methods 映射为 `store.commit` 调用（需要在根节点注入 `store`）
```
import { mapMutations } from 'vuex'
export default {
  // ...
  methods: {
    ...mapMutations([
      'increment', //将`this.increment()`映射为`this.$store.commit('increment')`
      // `mapMutations`也支持载荷：
      'incrementBy' //将`this.incrementBy(amount)`映射为`this.$store.commit('incrementBy', amount)`
    ]),
    ...mapMutations({
      add: 'increment' //将`this.add()`映射为`this.$store.commit('increment')`
    })
  }
}
```


在 Vuex 中，mutation 都是同步事务

为了处理异步操作，我们来看一看 **【Action】**

# Action
Action 类似于 mutation，不同在于：

- Action 提交的是 mutation，而不是直接变更状态
- Action 可以包含任意异步操作

Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，（与store实例具有相同方法和属性的context对象）因此你可以调用 `context.commit` 提交一个 mutation，或者通过 `context.state` 和 `context.getters` 来获取 state 和 getters。
当我们在之后介绍到 Modules 时，你就知道 context 对象为什么不是 store 实例本身了。

实践中，我们会经常用到 ES2015 的参数结构来简化代码（特别是我们需要调用 `commit` 很多次的调用）：
```
actions: {
  increment ({ commit }) {
    commit('increment')
  }
}
```

【终于明白了这个地方的 { commit } 是什么意思了】

## 分发 Action
Action 通过 `store.dispatch` 方法触发：
```
store.dispatch('increment')
```

【为什么不直接分发 mutation？mutation必须是同步执行，Action就不受约束！我们可以在 action 内部执行异步操作】

Actions 支持同样的载荷方式和对象方式进行分发：
```
// 以载荷形式分发
store.dispatch('incrementAsync', {
  amount: 10
})

// 以对象形式分发
store.dispatch({
  type: 'incrementAsync',
  amount: 10
})
```

来看一个更加实际的购物车示例，涉及到 **调用异步API** 和 **分发多重mutation**
```
actions: {
  checkout({ commit, state }, products) {
    // 把当前购物车的物品备份起来
    const saveCartItems = [...state.cart.added]
    // 发出结账请求，然后乐观地清空购物车
    commit(types.CHECKOUT_REQUEST)
    // 购物 API 接受一个成功回调和一个失败回调
    shop.buyProducts(
      products,
      // 成功操作
      () => commit(types.CHECKOUT_SUCCESS),
      // 失败操作
      () => commit(types.CHECKOUT_FAILURE, savedCartItems)
    )
  }
}
```


## 【在组件中分发 Action】
你在组件中使用 `this.$store.dispatch('xxx')` 分发 action，或者使用 `mapActions` 辅助函数将组件的 methods 映射为 `store.dispatch` 调用（需要先在根节点注入 `store`）
```
import { mapActions } from 'vuex'

export default {
  // ...
  methods: {
    ...mapActions([
      'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`

      // `mapActinos` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
    ]),
    ...mapActions({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
    })
  }
}
```

## 【组合 Action】
Action 通常是异步的、我们如何才能组合多个 action、以处理更加复杂的异步流程？
首先，你需要明白 `store.dispatch` 可以处理被触发的 action 的处理函数返回的 Promise，并且 `store.dispatch` 仍旧返回 Promise：
```
actions: {
  actionA({ commit }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('someMutation')
        resolve()
      }, 1000)
    })
  }
}
```
现在你可以：
```
store.dispatch('actionA').then(() => {
  // ...
})
```


在另外一个 action 中也可以调用别的 action：
```
actions: {
  // ...
  actionB ({ dispatch, commit }) {
    return dispatch('actionA').then(() => {
      commit('someOtherMutation')
    })
  }
}
```

最后，如果我们利用 async/await ，我们可以如下组合 action 。

# Module
由于使用单一状态树，应用的所有状态会几种到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。

Vuex允许我们将 store 分割成 **模块(module)**。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割。

## 【模块的局部状态】
对于模块内部的 mutation 和 getter ，接收的第一个参数(state)是 **模块的布局状态对象**。

同样，对于模块内部的 action，
【我们知道，Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象】
局部状态通过 context.state 暴露出来，根节点状态则为 context.rootState。
```
actions: {
  incrementIfOddOnRootSum({ state, commit, rootState}) {
    if((state.count + rootState.count) % 2 === 1) {
      commit('increment')
    }
  }
}
```

对于模块内部的 getter，根节点状态会作为第三个参数暴露出来：
【第一个参数是模块的布局状态对象，第二个参数是getters对象】
```
getters: {
  sumWithRootCount(state,getters,rootState) {
    return state.count + rootState.count
  }
}
```


## 【命名空间】
默认情况下，模块内部的 action、mutation 和 getter是注册在 **全局命名空间** 的 —— 这样使得多个模块能够对同一 mutation 或 action 做出响应。

如果希望你的模块具有更高的封装度和复用性，你可以通过添加 `namespaced: true` 的方式使其成为命名空间模块。当模块被注册后，它的所有 getter、action及mutation都会自动根据模块注册的路径调整命名。


启用了命名空间的 getter 和 action 会收到局部化的 `getter`，`dispatch` 和 `commit`。换言之，你在使用模块内容(module assets)时不需要在同一模块内额外添加空间名前缀。更改`namespaced`属性后不需要修改模块内的代码。

##【在命名空间模块内访问全局内容（Global Assets）】
如果你希望使用全局state和getter，`rootState`和`rootGetter`会作为第三和第四参数传入`getter`，也会通过`context`对象的属性传入action。

若需要在全局命名空间内分发action或提交mutation，将`{root:true}`作为第三个参数传给`dispatch`或`commit`即可。

## 【带命名空间的绑定函数】
当使用`mapState`，`mapGetters`，`mapActions`和`mapMutaions`这些函数来绑定命名空间模块时，写起来可能比较繁琐：
```
...mapState({
  a: state => state.come.nested.module.a
})
...mapActions([
  'some/nested/module/foo'
])
```
对于这种情况，你可以将模块的空间名称字符串作为第一个参数传递给上述函数，这样所有绑定都会自动将该模块作为上下文。于是上面的例子可以简化为：
```
...mapState('some/nested/module', {
  a: state => state.a
})
...mapActions('some/nested/module', [
  'foo',
  'bar'
])
```

而且，你可以通过使用 `createNamespacedHelpers` 创建基于某个命名空间辅助函数。它返回一个函数，对象里有新的绑定在给定命名空间值上的组件绑定辅助函数：
```
import { createNamespacedHelpers } from 'vuex'

const { mapState, mapActions } = createNamespacedHelpers('some/nested/module')

// 现在这两个辅助函数mapState，mapActions 将在 some/nested/module 中查找
```

## 【给插件开发者的注意事项】
如果你开发的插件提供了模块并允许用户将其添加到 Vuex store，可能需要考虑模块的空间名称问题。对于这种情况。你可以通过插件的参数对象来允许用户指定空间名称

##【模块动态注册】
在 store 创建之后，你可以使用 `store.registerModule` 方法注册模块。

之后就可以通过 `store.state.myModule` 和 `store.state.nested.myModule` 访问模块的状态。

模块动态注册功能使得其他 Vue 插件可以通过在 store 中附加新模块的方式来使用 Vuex 管理状态。例如，vuex-router-sync 插件就是通过动态注册模块将 vue-router 和 vuex 结合在一起，实现应用的路由状态管理。

你也可以使用 `store.unregisterModule(moduleName)` 来动态卸载模块。注意，你不能使用此方法卸载静态模块（即创建store时声明的模块）

##【模块重用】
如果我们使用一个纯对象来声明模块的状态，那么这个状态对象会通过引用被共享，导致状态对象被修改时 store 或模块间数据互相污染的问题。

实际上这和 vue 组件内的data是同样的问题。因此解决办法也是相同的——使用一个函数来声明模块状态（仅 2.3.0+ 支持）：
```
const MyReusableModule = {
  state() {
    return {
      foo: 'bar'
    }
  }
}
```











