---
title: AMD-CMD
date: 2017-04-07 13:25:24
categories: 综合
tags: [JavaScript]
comments: false
---

- AMD(Asynchronous module definition)规范
> AMD ，用白话文讲就是 **异步模块定义**

- CMD(Common module definition)规范
> CMD , **通用模块定义**

类似的还有 CommonJS Modules/2.0 规范，是 BravoJS 在推广过程中对模块定义的规范化产出。
目前这些规范的实现都能达成**浏览器端模块化开发的目的**。


当我们了解了 [CommonJS]() 以后，CommonJS 规范加载模块是同步的，也就是说，只有加载完成，才能执行后面的操作。
AMD 规范则是非同步加载模块，允许指定回调函数。由于 Node.js 主要用于服务器编程，模块文件一般都已经存在于本地硬盘，所以加载起来比较快，不用考虑非同步加载的方式，所以 CommonJS 规范比较适用。但是，如果是浏览器环境，要从服务器端加载模块，这时就必须采用非同步模式，因此浏览器端一般采用 AMD 规范。

|服务端JS|浏览器端JS|
|:---:|:---:|
|相同的代码需要多次执行|代码需要从一个服务器端分发到多个客户端执行|
|CPU 和内存资源是瓶颈|宽带是瓶颈|
|加载时从磁盘中加载|加载时需要通过网络加载|

AMD 的诞生，就是为了解决这两个问题：
1.实现 js 文件的异步加载,避免网页失去响应
2.管理模块之间的依赖性，便于代码的编写和维护

于是乎，AMD(异步模块定义)出现了，它就主要为前端 JS 的表现指定规范。它采用异步方式加载模块，模块的加载不影响它后面语句的运行。所有依赖这个模块的语句，都定义在一个回调函数中，等到加载完成之后，这个回调函数才会运行。

AMD 也采用 require() 语句加载模块，但是不同于 CommonJS，它要求两个参数：
```
require([module], callback);
```
第一个参数[module]，是一个数组，里面的成员就是要加载的模块；第二个参数 callback，则是加载成功之后的回调函数：
```
require(['math'], function (math) {
  math.add(2, 3);
});
```

实现 AMD 规范的加载器其实是挺多的，目前，主要有两个 Javascript 库实现了 AMD 规范：[require.js](https://github.com/requirejs/requirejs) 和 [curl.js](https://github.com/cujojs/curl)。不过多数人还是用 require.js 。
另外如果对 ES6 的模块感兴趣，可以考虑 [my.js](http://github.com/hax/my.js) ，是按照 ES6 草案的 module/loader 规范实现的。

[AMD](https://github.com/amdjs/amdjs-api/wiki) 是 [require.js](https://github.com/requirejs/requirejs) 在推广过程中对模块定义的规范化产出。

推荐学习 [require.js](http://requirejs.org/)。

AMD 模块的写法
require.js 加载的模块，采用 AMD 规范。也就是说，模块必须按照 AMD 的规定来写。
具体来说，就是模块必须采用特定的 define() 函数来定义。如果一个模块不依赖其他模块。那么可以直接定义在 define() 函数之中。
假定现在有一个 math.js 文件，它定义了一个 math 模块。那么，math.js 就要这样写：
```
// math.js
define(function (){
　var add = function (x,y){
　　return x+y;
　};
　return {
　　add: add
　};
});
```
加载方法如下：
```
// main.js
require(['math'], function (math){
　alert(math.add(1,1));
});
```
如果这个模块还依赖其他模块，那么 define() 函数的第一个参数，必须是一个数组，指明该模块的依赖性。
```
define(['myLib'], function(myLib){
　function foo(){
　　myLib.doSomething();
　}
　return {
　　foo : foo
　};
});
```
当require()函数加载上面这个模块的时候，就会先加载myLib.js文件。

## 加载非规范的模块
理论上，require.js加载的模块，必须是按照AMD规范、用define()函数定义的模块。但是实际上，虽然已经有一部分流行的函数库（比如jQuery）符合AMD规范，更多的库并不符合。那么，require.js是否能够加载非规范的模块呢？
回答是可以的。
这样的模块在用require()加载之前，要先用require.config()方法，定义它们的一些特征。
举例来说，underscore和backbone这两个库，都没有采用AMD规范编写。如果要加载它们的话，必须先定义它们的特征。
```
require.config({
　shim: {
　　'underscore': {
　　　exports: '_'
　　},
　　'backbone': {
　　　deps: ['underscore', 'jquery'],
　　　exports: 'Backbone'
　　}
　}
});
```
require.config()接受一个配置对象，这个对象除了有前面说过的paths属性之外，还有一个shim属性，专门用来配置不兼容的模块。具体来说，每个模块要定义（1）exports值（输出的变量名），表明这个模块外部调用时的名称；（2）deps数组，表明该模块的依赖性。
比如，jQuery的插件可以这样定义：
```
shim: {
　'jquery.scroll': {
　　deps: ['jquery'],
　　exports: 'jQuery.fn.scroll'
　}
}
```





[CMD](https://github.com/seajs/seajs/issues/277) 是 [sea.js](https://github.com/seajs/seajs) 在推广过程中对模块定义的规范化产出。
建议写一写 SeaJS 的 CMD 规范，与 AMD 非常类似，在国内的影响力非常大，但是个人觉得 SeaJS 比 RequireJS 好很多，另外由于是国人开发的，交流也非常方便，可以看到 github 上的更新、互动非常频繁


## AMD 与 CMD 的区别
区别：
1. 对于依赖的模块，AMD 是**提前执行**，CMD 是**延迟执行**。不过 RequireJS 从2.0开始，也改成了可以延迟执行（根据写法不同，处理方式不同）。CMD 推崇 as lazy as possible.
2. CMD 推崇**依赖就近**，AMD 推崇**依赖前置**





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
