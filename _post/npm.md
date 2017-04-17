title: Node.js 包管理器 —— npm

npm 之于 Node.js ，就想 pip 之于 Python,gem 之于 Ruby,pear 之于 PHP

npm 是 Node.js 官方提供的包管理工具，他已经成了 Node.js 包的标准发布平台，用于 Node.js 包的发布、传播、依赖控制。npm 提供了命令行工具，使你可以方便地下载、安装、升级、删除包，也可以让你作为开发者发布并维护包。

1. 获取一个包
使用 npm 安装包的命令格式为：
`npm [install/i] [package_name]`

例如你要安装 gulp-uglify ，可以在命令行运行：
`npm install gulp-uglify` 或 `npm i gulp-uglify`

2. 本地模式和全局模式
npm 在默认情况下会从 http://npmjs.org 搜索或下载包，将包安装到当前目录的 node_modules 子目录下。
如果你熟悉 Ruby 的 gem 或者 Python 的 pip，你会发现 npm 与它们的行为不同，gem 或 pip 总是以全局模式安装，使包可以供所有的程序使用，而 npm 默认会把包安装到当前目录下。这反映了 npm 不同的设计哲学。如果把包安装到全局，可以提供程序的重复利用程度，避免同样的内容的多分副本，但坏处是难以处理不同的版本依赖。如果把包安装到当前目录，或者说本地，则不会有不同程序依赖不同版本的包的冲突问题，同时还减轻了包作者的 API 兼容性压力，但缺陷则是同一个包可能会被安装许多次。

我们在使用 supervisor 的时候使用了 `npm install -g supervisor` 命令，就是以全局模式安装 supervisor 。

这里注意一点的就是，supervisor 必须安装到全局，如果你不安装到全局，错误命令会提示你安装到全局。如果不想安装到默认的全局，也可以自己修改全局路径到当前路径 `npm config set prefix "路径"` 安装完以后就可以用 supervisor 来启动服务了。
supervisor 可以帮助你实现这个功能，它会监视你对代码的驱动，并自动重启 Node.js 。

关于使用全局模式，多数时候并不是因为许多程序都有可能用到了它，为了减少多重副本而使用全局模式，而是因为**本地模式不会注册 PATH 环境变量**。

本地模式和全局模式的特点如下：
|模式|可通过 require 使用|注册 PATH|
|:---:|:---:|:---:|
|本地模式|是|否|
|全局模式|否|是|

3. 创建全局链接
npm 提供了一个有趣的命令 npm link，它的功能是在本地包和全局包之间创建符号链接。我们说过使用全局模式安装的包不能直接通过 require 使用。但通过 npm link 命令可以打破这一限制。举个例子，我们已经通过 `npm install -g express` 安装了 express，这时在工程的目录下运行命令：
`npm link express ./node_modules/express -> /user/local/lib/node_modules/express`
我们可以在 node_modules 子目录中发现一个指向安装到全局的包的符号链接。通过这种方法，我们就可以把全局包当做本地包来使用了。
除了将全局的包链接到本地以外，使用 npm link 命令还可以将本地的包链接到全局。使用方法是在包目录（package.json 所在目录）中运行 npm link 命令。如果我们要开发一个包，利用这种方法可以非常方便地在不同的工程间进行测试。

4. 包的发布
通过使用 npm init 可以根据交互式回答产生一个符合标准的 package.json。创建一个 index.js 作为包的接口,一个简单的包就制作完成了。
在发布前,我们还需要获得一个账号用于今后维护自己的包,使用 npm adduser 根据提示完成账号的创建
完成后可以使用 npm whoami 检测是否已经取得了账号。
接下来,在 package.json 所在目录下运行 npm publish,稍等片刻就可以完成发布了,打开浏览器,访问 http://search.npmjs.org/ 就可以找到自己刚刚发布的包了。现在我们可以在世界的任意一台计算机上使用 npm install neveryumodule 命令来安装它。
如果你的包将来有更新,只需要在 package.json 文件中修改 version 字段,然后重新使用 npm publish 命令就行了。
如果你对已发布的包不满意,可以使用 npm unpublish 命令来取消发布。

5. 创建包
包是在模块基础上更深一步的抽象，Node.js 的包类似于 C/C++ 的函数库或者 Java、.Net 的类库。它将某个独立的功能封装起来，用于发布、更新、依赖管理和版本控制。Node.js 根据 CommonJS 规范实现了包机制，开发了 npm 来解决包的发布和获取需求。
Node.js 的包是一个目录，其中包含了一个 JSON 格式的包说明文件 package.json。严格符合 CommonJS 规范的包应该具备以下特征：
。package.json 必须在包的顶层目录下；
。二进制文件应该在 bin 目录下；
。JavaScript 代码应该在 lib 目录下；
。文档应该在 doc 目录下；
。单元测试应该在 test 目录下。

Node.js 对包的要求并没有这么严格，只要顶层目录下有 package.json，并符合一些规范即可。当然为了提高兼容性，我们还是建议你在制作包的时候，严格遵守 CommonJS 规范。

我们也可以把文件夹封装为一个模块，即所谓的包。包通常是一些模块的集合，在模块的基础上提供了更高层的抽象，相当于提供了一些固定接口的函数库。通过定制 package.json，我们可以创建更复杂，更完善，更符合规范的包用于发布。
    
Node.js 在调用某个包时，会首先检查包中 packgage.json 文件的 main 字段，将其作为包的接口模块，如果 package.json 或 main 字段不存在，会尝试寻找 index.js 或 index.node 作为包的接口。
    
package.json 是 CommonJS 规定的用来描述包的文件，完全符合规范的 package.json 文件应该含有以下字段：
name: 包的名字，必须是唯一的，由小写英文字母、数字和下划线组成，不能包含空格。
description: 包的简要说明。
version: 符合语义化版本识别规范的版本字符串。
keywords: 关键字数组，通常用于搜索。
maintainers: 维护者数组，每个元素要包含 name 、email(可选)、web(可选)字段。
contributors: 贡献者数组，格式与 maintainers 相同。包的作者应该是贡献者数组的第一个元素。
bugs: 提交 bug 的地址，可以是网址或者电子邮件地址。
licenses: 许可证数组，每个元素要包含 type（许可证的名称）和 url（链接到许可证文本的地址）字段。
repositories: 仓库托管地址数组，每个元素要包含 type（仓库的类型，如 git）、URL（仓库的地址）和 path（相对于仓库的路径，可选）字段。
dependencies: 包的依赖，一个关联数组，由包名称和版本号组成。

*需要说明的是：json 文件不能有注释*



