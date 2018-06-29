
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
在vue-loader.conf.js里面可配置
```
cssModules: {
  localIndetName: '[path]-[name]-[hash:base64:5]'
}
```


