Webpack 本身只能处理 JavaScript 模块，如果要处理其他类型的文件，就需要使用 loader 进行转换。
所以如果我们需要在应用中添加 css 文件，就需要使用到 css-loader 和 style-loader，他们做两件不同的事情，css-loader 会遍历 CSS 文件，然后找到 url() 表达式然后处理他们，style-loader 会把原来的 CSS 代码插入页面中的一个 style 标签中。

runoob1.js 文件中这样写：

`require("!style!css!./style.css");`

require CSS 文件的时候都要写 loader 前缀 !style!css!，当然我们可以根据模块类型（扩展名）来自动绑定需要的 loader。 将 runoob1.js 中的 require("!style!css!./style.css") 修改为 require("./style.css") 。

然后执行：

`webpack runoob1.js bundle.js --module-bind 'css=style!css'`

显然，这两种使用 loader 的方式，效果是一样的。

## 配置文件
我们可以将一些编译选项放在配置文件中，以便于统一管理：
创建 webpack.config.js 文件，代码如下所示：

``` javascript
// webpack.config.js
module.exports = {
  entry: "./runoob1.js",
  output: {
    path: __dirname,
    filename: "bundle.js"
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: "style!css" }
    ]
  }
};
```


接下来我们只需要执行 webpack 命令即可生成 bundle.js 文件。
`webpack`

webpack 命令执行后，会默认载入当前目录的 webpack.config.js 文件。

## 插件
插件在 webpack 的配置信息 plugins 选项中指定，用于完成一些 loader 不能完成的功能。
webpack 自带一些插件，你可以可以通过 cnpm 安装一些插件。
使用内置插件需要通过以下命令来安装：
`cnpm install webpack --save-dev`
这个时候就可以使用 webpack 的内置插件了。

记得要在 `webpack.config.js` 开头引入 webpack 的包。
`var webpack = require('webpack');`

## 开发环境
当项目逐渐变大，webpack 的编译时间会变长，可以通过参数让编译的输出内容带有进度和颜色。
`webpack --progress --colors`

`webpack --progress --colors --watch`

当然，我们可以使用 webpack-dev-server 开发服务，这样我们就能通过 localhost:8080 启动一个 express 静态资源 web 服务器，并且会以**监听模式自动运行** webpack，在浏览器打开 http://localhost:8080/ 或 http://localhost:8080/webpack-dev-server/ 可以浏览项目中的页面和编译后的资源输出，并且通过一个 socket.io 服务**实时监听**它们的变化并自动刷新页面。