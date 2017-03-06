- CommonJS规范

- AMD(Asynchronous module definition)规范
> AMD ，用白话文讲就是 **异步模块定义**

- CMD(Common module definition)规范


如果你的系统中有比较多的js代码或者文件，请选择一个合适的模块定义规范——CMD / AMD

require.js
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

AMD:Asynchronous Module Dediniton -- 异步模块定义

AMD也采用require()语句加载模块，但是不同于CommonJS，它要求两个参数：
require([module], callback);

目前，主要有两个Javascript库实现了AMD规范：require.js 和 curl.js。 本系列的第三部分，将通过介绍require.js ，进一步讲解AMD的用法，以及如何将模块化编程投入实战。

实现AMD规范的加载器其实是挺多的，不过多数人还是用requirejs。另外如果对ES6的模块感兴趣，可以考虑http://github.com/hax/my.js ，是按照ES6草案的module/loader规范实现的。
my.js??很专业啊
sea.js ?? 很专业啊 
建议写一写 SeaJS 的 CMD 规范，与 AMD 非常类似，在国内的影响力非常大，但是个人觉得 SeaJS 比 RequireJS 好很多，另外由于是国人开发的，交流也非常方便，可以看到 github 上的更新、互动非常频繁

require.js的诞生，就是为了解决这两个问题：
1.实现js文件的异步加载,避免网页失去响应
2.管理模块之间的依赖性，便于代码的编写和维护