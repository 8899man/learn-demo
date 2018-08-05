
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






















