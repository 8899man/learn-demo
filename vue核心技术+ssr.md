
# Vue核心技术Vue+Vue-Router+Vuex+SSR实战精讲

1、webpack打包图片资源到同一个目录中。
```
{
  test: /\.(gif|jpg|jpeg|png|svg)$/,
  use: [
    {
      loader: 'url-loader',
      options: {
        limit: 1024,
        name: 'resource/[path][name].[hash:8].[ext]'
      }
    }
  ]
}

```

[hash] 和 [chunkhash] 的长度可以使用 [hash:16] （默认为20）来指定。通过指定 output.hashDigestLength 在全局配置长度。

2、在 `.vue` 文件，我们修改样式不会触发页面刷新，这个时候，你要考虑加上 `vue-style-loader` 在 styl 的 rules 里面。


3、在 vue-cli 构建的项目中，vue-loader.conf.js 中的配置将会在 webpack.base.conf.js 中使用，vue-loader 的配置也是很强大的，具体看 [vue-loader文档](https://vue-loader.vuejs.org/zh/guide/)。

4、vue-loader 中有一个自定义模块，挺有意思的。

5、关于vue最后渲染出来的class名字的问题
在vue-loader.conf.js里面可配置localIdentName
```
cssModules: {
  localIdentName: '[path]-[name]-[hash:base64:5]',
  camelCase: true
}
```
camelCase:true是什么意思呢。就是让我们最后生成的class名是首字母小写的驼峰，而不是短横线链接。
我们知道再javascript中，如果是短横线连接的变量名，使用的时候需要用中括号扩起来，而不能用默认的.来获取它的值，而驼峰的变量名则没有这个限制。

上面这个 vue-loader 的配置是针对 .vue 文件中的样式的配置，最终生成出来的class名字是 【client-layout--header-2AE8s_0】

6、那么在单一的 .styl 文件中的样式class名如何设置呢，这个需要在 webpack 中来设置。
```
rules: [
  {
    test: /\.styl/,
    use: [
      'vue-style-loader',
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true
        }
      },
      'stylus-loader'
    ]
  }
]
```

将 `css-loader` 改为：

```
rules: [
  {
    test: /\.styl/,
    use: [
      'vue-style-loader',
      {
        loader: 'css-loader',
        options: {
          module: true,
          localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]'
        }
      },
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true
        }
      },
      'stylus-loader'
    ]
  }
]
```

不过，还是建议，使用上面最正常的 css-loader 就好了。

6、webpack 中 eslint 的配置
```
module: {
  rules: [
    {
      test: /\.(vue|js|jsx)$/,
      loader: 'eslint-loader',
      exclude: /node_modules/,
      enforce: 'pre'
    }
  ]
}
```

`enforce: 'pre'` 就是提前处理，比如说 vue 文件，先用 eslint-loader 来检测，如果代码格式不合格，就不用进行后面 vue-loader 的操作了。

7、editorconfig 用来规范我们编辑器的配置。
在项目目录下新建 `.editorconfig` 文件。
```
root = true

[*]
charset = utf-8
end_of_line = lf
indent_size = 2
indent_style = space
insert_final-newline = true
trim_trailing_whitespace = true
```

8、git 提交代码之前先检测代码是否满足 eslint 规则
```
npm i husky -D

然后在 package.json 里面的 scripts 里面添加一个配置：
"precommit": "npm run lint-fix",
"lint-fix": "eslint --fix --ext .js --ext .jsx --ext .vue client/"
```
在 git commit 之前会自动执行 precommit 。

9、runtime-only 里面无法使用 template 标签，所以我们看到的都是使用 `render => app` 的形式。

10、在Vue的options里面，我们可以定义watch对象，来监听某些值的改变，随着vue组件的销毁，options里面定义的内容也会被销毁。
但是，如果我们是使用$watch的方式来声明的watch的话。它会返回一个unWatch方法，调用这个方法可以销毁相应的watch方法。
```
const unWatch = app.$watch('text', (newText, oldText) => {
  console.log(`${newText} : ${oldText}`)
})
setTimeout(() => {
  unWatch()
}, 2000)
```

11、$on与$once的区别
```
app.$once('test', (a, b) => {
  console.log(`test emited ${a} ${b}`)
})
setInterval(() => {
  app.$emit('test', 1, 2)
}, 1000)
```
因为使用的是$once所以，只会执行一次。


12、$forceUpdate
强制组件渲染。比如说data里面有一个obj空对象，现在对obj.a做一些修改，在模版中，{{obj.a}}是不是有变化的，如果我们修改了obj.a，然后调用this.$forceUpdate方法，才能看到变化。
当然，我们是不建议使用这个方法的。因为你明明可以有更优雅的做法来实现。
如果使用不当，会造成我们的应用一直的渲染，影响性能。

13、
```
i = 0;
this.$set(app.obj, 'a', i);
```

14、vue声明周期函数
new一个vue实例的时候，会触发beforeCreate和created。
挂载到DOM的时候，会触发beforeMount和mounted。
有数据改变时会触发beforeUpdate和updated。
activated和deactivated跟组件的keep-alive有关。

beforeMount的时候，此时的this.$el是我们选择的html中的dom元素。
mounted的时候，此时的this.$el是我们vue实例中的template对象。

beforeMount和mounted在服务端渲染时不会被调用。

15、render,renderError
```
render(h) {
  return h('div', {}, this.text)
}
renderError(h, err) {
  return h('div', {}, err.stack)
}
render的时候出现错误，则会触发renderError方法。 
```

16、errorCaptured
与renderError只能在开发环境使用不同的是，errorCaptured能在捕捉成产环境的错误，用法与renderError类似。
errorCaptured会向上冒泡，父组件能接受到子组件传递的错误。

17、相较于methods里面的方法，每次渲染都会重新计算，computed则是由缓存的，以来的数据不变，则使用缓存，不重新计算，性能会好一些。

18、其实watch有更多的属性。
```
watch: {
  obj: {
    handler() {
      console.log('obj.a changed')
    },
    immediate: true,
    deep: true
  }
}
```
这样的话，修改obj里面属性的值，也会触发这个watch。
当然，你还可以这样：
```
watch: {
  'obj.a': {
    handler() {
      console.log('obj.a changed')
    },
    immediate: true
  }
}
```
这个时候不需要`deep:true`，你修改obj.a就能触发这个watch。

19、vue指令
v-once
v-model [.lazy, .number, .trim]

20、一个vue组件，我们可以认为是一个类，类的命名规范，首字母大写。

21、Vue.extend
主要为了便于扩展单文件组件
```
const CompVue = Vue.extend(component)
new CompVue({
  el: '#root',
  propsData: {
    propOne: 'xxx'
  },
  data: {
    text: 123
  }
})
```

22、slot，插槽
具名插槽
```
<div class="header">
  <slot name="header"></slot>
</div>
<div class="bdoy">
  <slot name="body"></slot>
</div>
```
使用的时候
```
<comp>
  <span slot="header">this is header</span>
  <span slot="body">this is body</span>
</comp>
```

23、scope,slot-scope,作用域插槽
```
<slot value="456"></slot>
```
使用的时候
```
<span slot-scope="props">{{props.value}}</span>
```
当然，也可以使用更直接的方式：
```
<slot :value="123"></slot>
```

24、依赖注入（provide,reject）
provide默认不是响应式的。
```
provide() {
  return {
    _this: this,
    value: this.value
  }
}
```
如何做成响应式的：
```
provide() {
  const data = {}
  Object.defineProperty(data, 'value', {
    get() {
      return this.value,
      enumerable: true
    }
  })
  return {
    data
  }
}
```

25、vue的render
其实template最终就是用render来渲染的，不写template，直接写render也是一样的。
```
render(createelement) {
  return createElement(
    'comp-one',
    {
      ref: 'comp'
    },
    [
      createElement('span', {
        ref: 'span'
      }, this.value)
    ]
  )
}
```

```
render() {
  return createElement(div, {
    style: this.style,
    attrs: {
      id: 'test-id'
    }
  }, [
    this.$slots.header,
    this.props1
  ])
}
```

```
render(createelement) {
  return createElement(
    'comp-one',
    {
      ref: 'comp',
      props: {
        props1: this.value
      },
      on: {
        click: () => {
          console.log('clicked')
        }
      },
      on: {
        dbclick: this.handleDbClick
      }
    },
    [
      createElement('span', {
        ref: 'span',
        slot: 'header',
      }, this.value)
    ]
  )
}
```

26、vue-router
Router 构建选项
```
routes,
mode,
base,
linkActiveClass,
linkExactActiveClass,
scrollBehavior,
parseQuery/stringifyQuery,
fallback
```
说一下linkActiveClass和linkExactActiveClass：
linkExactActiveClass是精确激活。
linkActiveClass是默认“激活class类名”。
例：
当前选中的是 /a/b ，那么b链接上面就会增加这两个class，而a链接上面只会增加linkActiveClass。

27、mode: history 配置
在vue-router中配置了 `mode: 'history'`，发到生产环境后，服务端需要做相应的配置。
在开发环境时，可以在devServer中增加配置项，来体验history模式。
```
historyApiFallback: {
  index: '/index.html'
}
```

28、scrollBehavior
页面路径跳转的时候，这个页面要不要滚动。
savedPosition记录之前从from到to的位置。
```
scrollBehavior(to, from ,savedPosition) {
  if(savedPosition) {
    return savedPosition
  } else {
    return { x: 0, y: 0}
  }
}
```

29、parseQuery/stringifyQuery
定制化转义url参数
```
// 字符串转obj
parseQuery(query) {

},
// obj转字符串
stringifyQuery(obj) {

}

```

30、fallback
当浏览器不支持 history.pushState 控制路由是否应该回退到 hash 模式。默认值为 true。
fallback设为true，就可以将不支持history模式的改为hash模式。
fallback默认也是true。

31、路由元信息 meta
与路由无关，但是可以在组件中需要用到的数据，可以放在meta中

32、路由传参（params, query）
'localhost:8080/app/123?a=33&b=44'
```
// 如果你定义了路由
path: '/app/:id'
```
那么：
```
params: {id: "123"}
query: {a: "33", b: "44"}
```

33、使用props将组件和路由解耦
如果我们在组件中需要用到路由的params或者query参数的话，可能我们会这样：
```
const User = {
  template: '<div>User {{ $route.params.id }}</div>'
}
```
像这样，在组件中使用 `$route` 会使之与其对应路由形成高度耦合，从而使组件只能在某些特定的 URL 上使用，限制了其灵活性。（只有这个路由才能使用这个组件）
使用 `props` 将组件和路由解耦。
```
const User = {
  props: ['id'],
  template: '<div>User {{ id }}</div>'
}
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User, props: true },
    // 对于包含命名视图的路由，你必须分别为每个命名视图添加 `props` 选项：
    {
      path: '/user/:id',
      components: { default: User, sidebar: Sidebar },
      props: { default: true, sidebar: flase }
    }
  ]
})
```
这样你便可以在任何地方使用该组件，使得该组件更易于重用和测试。
在 `route` 中使用 `props` 是非常灵活的，不限于 true 或者 false 的配置。

34、全局守卫、全局解析守卫、全局后置钩子
*记住参数或查询的改变并不会触发进入/离开的导航守卫*。你可以通过观察 `$route` 对象来应对这些变化，或使用 `beforeRouteUpdate` 的组件内守卫。
```
beforeEach((to, from, next) => {}) -> beforeResolve((to, from, next) => {}) -> afterEach((to, from) => {})
```

35、路由独享的守卫、组件内的守卫、完整的导航解析流程
1)你可以在路由配置上直接定义`beforeEnter`守卫：
```
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
        // ...
      }
    }
  ]
})
```

beforeEnter 的调用时机在 beforeEach 和 beforeResolve 之间。

2)最后，你可以在路由组件内直接定义以下路由导航守卫：
```
beforeRouteEnter
beforeRouteUpdate
beforeRouteLeave
```
beforeRouteUpdate，在同一个路由，params或者query发生变化时，会触发。当然，我们在组件内，使用watch来监听route也可以达到相同的目的，但是开销要大一些。我们通过这个`beforeRouteUpdate`这个钩子，就更方便一点。

`beforeRouteEnter` 守卫不能访问this，因为守卫在导航确认前被调用，因此即将登场的新组件还没被创建。
不过，你可以通过传一个回调给 `next` 来访问组件实例。在导航被确认的时候执行回调，并且把组件实例作为回调方法的参数。
注意`beforeRouteEnter`是支持给`next`传递回调的唯一守卫。对于`beforeRouteUpdate`和`beforeRouteLeava`来说，`this`已经可用了，所以不支持传递回调，因为没有必要了。

`beforeRouteLeave`使用场景：在当前页的表单，用户填了一些数据，这个时候用户不小心点到了别的链接，这个时候可以判断一下，如果用户表单填写了内容，就可以弹窗提示：是否确定要离开本页。

35、异步组件
我们的理由如果非常多的情况下，我们一次性通过webpack把所有的代码打包进去，会导致我们这个js文件非常大，初始加载的时候，时间很长。我们在访问一个页面的时候，也会把其他页面的js文件全部加载过来，这明显是一种比较浪费的行为。
我们如果可以对于不同的路由，我们只加载对应的这一部分的代码和我们整个核心的代码。
通过vue-route和webpack，我们可以很方便的实现异步路由加载。
```
import Todo from '@/views/todo/todo.vue'
routes: [
  {
    path: '/',
    component: Todo
  }
]
```
改为：
```
routes: [
  {
    path: '/',
    component: () => import('@/views/todo/todo.vue')
  }
]
```
你只需要这么做就ok了。

36、vuex
修改vuex中state中的数据的正确操作是commit一个mutations。
虽然我们直接修改也是可以的。`this.$store.state.count = 3`，但是，真的不推荐这么做。

在开发过程中，为了规范开发人员的操作，防止在其他地方修改state中的数据，
在new Vuex.Store的时候可以传入strict属性。
```
export default () => {
  return new Vuex.Store({
    strict: true,
    state: defaultState,
    metations,
    getters
  })
}
```
加了这个以后，不规范的操作将会报错提醒。
但是这个属性只能在开发环境使用，正式环境请将这个去掉。
```
const isDev = process.env.NODE+ENV === 'development'
export default () => {
  return new Vuex.Store({
    strict: isDev,
    state: defaultState,
    metations,
    getters
  })
}
```

为什么有了mutation还要有action呢？mutation只能是同步操作，action里面可以有异步操作。
commit 触发 mutation
dispatch 触发 action

vuex之module
```
modules: {
  a: {
    // namespaced: true,
    state: {
      text: 1
    },
    mutations: {
      updateText(state, text) {
        state.text = text
      }
    }
  },
  b: {
    state: {
      text: 2
    }
  }
}
```
在使用state中的值的时候，需要 `this.$store.state.a.text` 需要这样加上模块名。
但是在使用mutations的时候，则不需要模块名，因为vuex默认会将所有的mutation放到全局。

如果，我们有模块中mutation重名的情况怎么办呢？这个时候就需要加上命名空间了，`namespaced: true`，
```
methods: {
  ...mapMutations(['a/updateText'])
}
使用的时候：
由
this.updateText('123'){}
变成
this['a/updateText']('123') {}
```

模块里面如何获取根模块中的数据

```
modules: {
  a: {
    namespaced: true,
    state: {
      text: 1
    },
    mutations: {
      updateText(state, text) {
        state.text = text
      }
    },
    getters: {
      textPlus(state, getters, rootState) {
        return state.text + rootState.count
      },
      textPlus1(state, getters, rootState) {
        return state.text + rootState.b.count
      }
    }
  }
}
```

模块里面如果调用全局的mutation
```
modules: {
  a: {
    namespaced: true,
    state: {
      text: 1
    },
    mutations: {
      updateText(state, text) {
        state.text = text
      }
    },
    actions: {
      add({ state, commit, rootState }) {
        // 这个updateCount是全局的mutation，所以要加上{root: true}
        commit('updateCount', rootState.count, {root: true})
      }
    }
  }
}
```

动态注册模块
```
store.registerModule('c', {
  state: {
    text: 3
  }
})
```

为vuex的开发增加热更替的功能
```
if(module.hot) {
  module.hot.accept([
    './state/state',
    './mutations/mutations',
    './actions/actions',
    './getters/getters'
  ], () => {
    const newState = require('./state/state').default
    const newMutations = require('./mutations/mutations').default
    const newActions = require('./actions/actions').default
    const newGetters = require('./getters/getters').default
    store.hotUpdate({
      state: newState,
      mutations: newMutations,
      getters: newGetters,
      actions: newActions
    })
  })
  return store
}
```

如果没有热更替的话，你的每一次修改vuex，都会触发页面reload，导致之前的操作都没了。

解绑模块(unregister module)
```
store.unregisterModule('c')
```

vuex 之 watch
```
store.watch((state) => state.count + 1, (newCount) => {
  console.log(newCount)
})
```





















