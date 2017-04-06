- CommonJS规范
> [CommonJS require 规范](http://wiki.commonjs.org/wiki/Modules/1.1.1#Require)

- AMD(Asynchronous module definition)规范
> AMD ，用白话文讲就是 **异步模块定义**

- CMD(Common module definition)规范
> CMD , **通用模块定义**


Node.js 使用的 CommonJS 规范，
Node.js 中使用 require() 来引入模块或者包
类似的操作是什么意思呢？在其他语言中，常见的有 import include 等等。

> 在 Node.js 中，我们可以直接通过 require 获取核心模块，例如 require('fs') 。核心模块拥有最高的加载优先级，换言之如果有模块与其命名冲突，Node.js 总是会加载核心模块。

如果有模块与核心模块命名冲突，Node.js 为什么可以选择加载核心模块呢？require 的实现机制是怎样的呢？

按路径加载模块
    如果require参数以"/"开头，那么就以绝对路径的方式查找模块名称，例如require('/home/neveryu/module')将会按照 优先级依次尝试加载/home/neveryu/module.js、/home/neveryu/module.json和/home/neveryu/module.node。
    如果require参数"./"或"../"开头，那么则以相对路径的方式查找模块，这种方式在应用中是最常见的。例如前面的例子中我们用了require('./hello')来加载同一文件夹下的hello.js。

通过查找node_modules目录加载模块
如果require参数不以"/"，"./"或"../"开头，而该模块又不是核心模块，那么就要通过查找node_modules加载模块了。我们使用npm获取的包通常就是以这种方式加载的。
在node_modules目录的外面一层，外面可以直接使用require('express')来代替require('./node_modules/express')。这是Node.js模块加载的一个重要特征：通过查找node_modules目录来加载模块。
我们不仅要在project目录下的app.js中使用require('express')，而且可能要在controllers子目录下的index_controller.js中也使用require('express')，这时就需要向父目录上溯一层才能找到node_modules中的express了。


加载缓存
    Node.js通过文件名缓存所有加载过的文件模块，所以以后再访问到时就不会重新加载了。注意，Node.js是根据实际文件名缓存的，而不是require()提供的参数缓存的，也就是说即使你分别通过require('express')和require('./node_modules/express')加载两次，也不会重复加载，因为尽管两次参数不同，解析到的文件却是同一个。




如果你的系统中有比较多的 js 代码或者文件，请选择一个合适的模块定义规范——CMD / AMD

[AMD](https://github.com/amdjs/amdjs-api/wiki) 是 [require.js](https://github.com/requirejs/requirejs) 在推广过程中对模块定义的规范化产出。
[CMD](https://github.com/seajs/seajs/issues/277) 是 [sea.js](https://github.com/seajs/seajs) 在推广过程中对模块定义的规范化产出。

类似的还有 CommonJS Modules/2.0 规范，是 BravoJS 在推广过程中对模块定义的规范化产出。
目前这些规范的实现都能达成**浏览器端模块化开发的目的**。

关于require.js的发展由来可以查阅阮一峰的日志
JavaScript模块化编程(一):模块的写法
http://www.ruanyifeng.com/blog/2012/10/javascript_module.html

独立性是模块的重要特点就，模块内部最好不与程序的其他部分直接交互。

JavaScript模块化编程(二):AMD规范
http://www.ruanyifeng.com/blog/2012/10/asynchronous_module_definition.html

# 为什么要使用模块？
因为有了模块，我们就可以更方便的使用别人的代码，想要什么功能，就加载什么功能。
但是，这样做有一个前提，那就是大家必须以同样的方式编写模块，否则你有你的写法，我有我的写法，岂不是乱了套！考虑到Javascript模块现在还没有官方规范，这一点就更重要了。
目前，通行的Javascript模块规范共有两种：CommonJS和AMD。我主要介绍AMD，但是要先从CommonJS讲起。

# 九、浏览器环境
有了服务器端模块以后，很自然地，大家就想要客户端模块。而且最好两者能够兼容，一个模块不用修改，在服务器和浏览器都可以运行。
但是，由于一个重大的局限，使得CommonJS规范不适用于浏览器环境。还是上一节的代码，如果在浏览器中运行，会有一个很大的问题，你能看出来吗？
　　var math = require('math');
　　math.add(2, 3);
第二行math.add(2, 3)，在第一行require('math')之后运行，因此必须等math.js加载完成。也就是说，如果加载时间很长，整个应用就会停在那里等。
这对服务器端不是一个问题，因为所有的模块都存放在本地硬盘，可以同步加载完成，等待时间就是硬盘的读取时间。但是，对于浏览器，这却是一个大问题，因为模块都放在服务器端，等待时间取决于网速的快慢，可能要等很长时间，浏览器处于"假死"状态。
因此，浏览器端的模块，不能采用"同步加载"（synchronous），只能采用"异步加载"（asynchronous）。这就是AMD规范诞生的背景。


AMD也采用require()语句加载模块，但是不同于CommonJS，它要求两个参数：
require([module], callback);

目前，主要有两个Javascript库实现了AMD规范：require.js 和 curl.js。
[curl.js](https://github.com/cujojs/curl)

本系列的第三部分，将通过介绍 [require.js](https://github.com/requirejs/requirejs) ，进一步讲解 AMD 的用法，以及如何将模块化编程投入实战。

[Javascript模块化编程（三）：require.js的用法](http://www.ruanyifeng.com/blog/2012/11/require_js.html)

实现 AMD 规范的加载器其实是挺多的，不过多数人还是用 require.js 。另外如果对 ES6 的模块感兴趣，可以考虑http://github.com/hax/my.js ，是按照ES6草案的module/loader规范实现的。
my.js??很专业啊。[my.js](http://github.com/hax/my.js)
sea.js ?? 很专业啊 
建议写一写 SeaJS 的 CMD 规范，与 AMD 非常类似，在国内的影响力非常大，但是个人觉得 SeaJS 比 RequireJS 好很多，另外由于是国人开发的，交流也非常方便，可以看到 github 上的更新、互动非常频繁

require.js的诞生，就是为了解决这两个问题：
1.实现js文件的异步加载,避免网页失去响应
2.管理模块之间的依赖性，便于代码的编写和维护

区别：
1. 对于依赖的模块，AMD 是**提前执行**，CMD 是**延迟执行**。不过 RequireJS 从2.0开始，也改成了可以延迟执行（根据写法不同，处理方式不同）。CMD 推崇 as lazy as possible.
2. CMD 推崇**依赖就近**，AMD 推崇**依赖前置**

[require.js 官方文档](http://requirejs.org/)



**相关资料：**

[http://www.2cto.com/kf/201411/350741.html](http://www.2cto.com/kf/201411/350741.html)

[http://blog.csdn.net/jackwen110200/article/details/52105493](http://blog.csdn.net/jackwen110200/article/details/52105493)

[http://blog.chinaunix.net/uid-26672038-id-4112229.html](http://blog.chinaunix.net/uid-26672038-id-4112229.html)

[http://www.cnblogs.com/dojo-lzz/p/4707725.html](http://www.cnblogs.com/dojo-lzz/p/4707725.html)

[https://www.zhihu.com/question/20351507](https://www.zhihu.com/question/20351507)

[https://zhidao.baidu.com/question/1513854110117591540.html](https://zhidao.baidu.com/question/1513854110117591540.html)

[http://zccst.iteye.com/blog/2215317](http://zccst.iteye.com/blog/2215317)

[https://cnodejs.org/topic/558fab23ebf9c92d17e73462](https://cnodejs.org/topic/558fab23ebf9c92d17e73462)

[http://timeblog.blog.51cto.com/8650972/1598801](http://timeblog.blog.51cto.com/8650972/1598801)

[http://www.tuicool.com/articles/MvuIRn](http://www.tuicool.com/articles/MvuIRn)


