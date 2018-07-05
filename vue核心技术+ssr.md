
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





