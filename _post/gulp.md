[TOC]

# 什么是 gulp
[gulp](http://gulpjs.com/) 是一个前端构建工具，它能通过自动执行常见任务，比如编译预处理 CSS ，压缩 JavaScript 和刷新浏览器，来改进网站开发的过程，从而使开发更加快速高效。

# 为什么要用 gulp
与 grunt 相比，gulp 无需写一大堆繁杂的配置参数，[API](https://github.com/gulpjs/gulp/blob/master/docs/API.md)（[中文 API](http://www.gulpjs.com.cn/docs/api/) ） 也非常简单，学习起来很容易，而且 gulp 使用的是 nodejs 中 [stream](https://nodejs.org/api/stream.html) 来读取和操作数据，其速度更快。

# 如何使用 gulp
## Installing Gulp
新版的 gulp 命令行工具已经改名为 gulp-cli 。
如果你之前安装了全局的 gulp 。在使用新的 gulp-cli 之前，执行命令 `npm rm --global gulp` 。

### Install the gulp command 
``` bash
npm install --global gulp-cli
```

### Install gulp in your devDependencies
Run this command in your project directory
``` bash
npm install --save-dev gulp
```

## Create a gulpfile
Create a file called gulpfile.js in your project root with these contents:
``` javascript
var gulp = require('gulp');

gulp.task('default', function() {
  // place code for your default tash here
});
```

## Test it out
Run the gulp command in your projct directory:
``` bash
gulp
```

# gulp API
gulp 的核心 API 有四个：gulp.task() 、 gulp.src() 、 gulp.dest() 、 gulp.watch() 。
[gulp API](https://github.com/gulpjs/gulp/blob/master/docs/API.md)
[gulp API 中文](http://www.gulpjs.com.cn/docs/api/)

## gulp.src()
gulp.src() 可以读取你需要操作的文件，相比于 Grunt 主要以文件为媒介来运行它的工作流，gulp 使用的是 Nodejs 中的 [stream](https://nodejs.org/api/stream.html) 流，首先获取到需要的 stream ，然后可以通过 stream 的 pipe() 方法把流导入到你想要的地方，比如 gulp 的插件中，经过插件处理后的流又可以继续导入到其他插件中，当然也可以把流写入到文件中。所以 gulp 是以 stream 为媒介的，它不需要频繁的生成临时文件，这也是 gulp 的速度比 Grunt 快的一个原因。再回到正题上来，gulp.src() 方法正是用来获取流的，但要注意这个流里的内容不是原始的文件流，而是一个虚拟文件对象流（Vinyl files），这个虚拟文件对象中存储着原始文件的路径、文件名、内容等信息，这个我们暂时不用去深入理解，你只需简单的理解可以用这个方法来读取你需要操作的文件就行了。其语法为：
``` javascript
gulp.src(globs [, options])
```
gulp 用到的 glob 的匹配规则以及一些文件匹配技巧。
gulp 内部使用了 node-glob 模块来实现其文件匹配功能。我们可以使用下面这些特殊的字符来匹配我们想要的文件：

- * 匹配文件路径中的 0 个或多个字符，但不会匹配路径分配符，除非路径分隔符出现在末尾
- ** 匹配路径中的 0 个或多个目录及其子目录，需要单独出现，即它左右不能有其他东西了。如果出现在末尾，也能匹配文件。
- ? 匹配文件路径中的一个字符（不会匹配路径分隔符）
- [...] 匹配方括号中出现的字符中的任意一个，当方括号中第一个字符为 ^ 或 ! 时，则表示不匹配方括号中出现的其他字符中的任意一个，类似 js 正则表达式中的用法。
- !(pattern|pattern|pattern) 匹配任何与括号中给定的任一模式都不匹配的
- ?(pattern|pattern|pattern) 匹配括号中给定的任一模式 0 次或 1 次，类似于 js 正则中的(pattern|pattern|pattern)?
- +(pattern|pattern|pattern) 匹配括号中给定的任一模式至少 1 次，类似于正则中的(pattern|pattern|pattern)
- *(pattern|pattern|pattern) 匹配括号中的给定的任一模式 0 次或多次，类似于 js 正则中的 (pattern|pattern|pattern)
- @(pattern|pattern|pattern) 匹配括号中给定的任一模式 1 次，类似于 js 正则中的(pattern|pattern|pattern)

下面以一系列例子来加深理解
- * 能匹配 a.js 、 x.y 、 abc 、 abc/ ，但不能匹配 a/b.js
- *.* 能匹配 a.js 、 style.css 、 a.b 、 x.y
- */*/*.js 能匹配 a/b/c.js 、 x/y/z.js ，不能匹配 a/b.js 、a/b/c/d.js
- ** 能匹配 abc 、 a/b.js 、 a/b/c.js 、 x/y/z

http://www.cnblogs.com/2050/p/4198792.html


##



请问下，gulp写进项目package.json文件的依赖有什么作用；
方便别人查看你项目中有些什么依赖，而且在项目目录下执行 npm install 命令会安装项目 package.json 中的所有依赖模块，这样就能简化项目的安装程序了，不用一个一个模块去安装啊
[前端构建工具gulpjs的使用介绍及技巧](http://www.cnblogs.com/2050/p/4198792.html)



下面这个命令可以省略大段的输入参数，直接创建一个配置文件：
$ npm init --yes


gulp中task中return的用途是什么
先看一个例子：
``` javascript
gulp.task('dev',['css','js'],function(){

});
gulp.task('js',function(){
    gulp.src(scriptSrc)
        .pipe(changed(dist,{ extension: '.js'}))
        .pipe(plumber({
            errorHandler: function(error) {
                notify.onError("Error:<%=error.message%>");
                console.log(error);
            }
        }))
        .pipe(debug({ title: '编译：'}))
        .pipe(sourcemaps.init())
        .pipe(babel(babelOpt))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dist));
});
gulp.task('css',function(){
    gulp.src(styleSrc)
        .pipe(changed(dist))
        .pipe(debug({ title: '编译：'}))
        .pipe(minifyCss())
        .pipe(gulp.dest(dist));
});
```

本人使用的时候发现，执行task的时候总是先finished,然后再编译
解决方法
加上return，不加return的话，task和里面的gulp流式异步执行的，所以就会出现先finished再编译的情况。
``` javascript
gulp.task('dev',['css','js'],function(){

});
gulp.task('js',function(){
    return gulp.src(scriptSrc)
        .pipe(changed(dist,{ extension: '.js'}))
        .pipe(plumber({
            errorHandler: function(error) {
                notify.onError("Error:<%=error.message%>");
                console.log(error);
            }
        }))
        .pipe(debug({ title: '编译：'}))
        .pipe(sourcemaps.init())
        .pipe(babel(babelOpt))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dist));
});
gulp.task('css',function(){
    return gulp.src(styleSrc)
        .pipe(changed(dist))
        .pipe(debug({ title: '编译：'}))
        .pipe(minifyCss())
        .pipe(gulp.dest(dist));
});
```


关于gulp.task(name[, deps], fn)

name - 任务的名字，如果你需要在命令行中运行你的某些任务，那么，请不要在名字中使用空格。

deps
类型：Array
一个包含任务列表的数组，这些任务会在你当前任务运行之前完成。
注意：你的任务是否在这些前置依赖的任务完成之前运行了？请一定要确保你所依赖的任务列表中的任务都使用了正确的异步执行方式：使用一个callback，或者返回一个promise或stream。

fn
该函数定义任务所要执行的一些操作。通常来说，他会是这种形式：`gulp.src().pipe(someplugin())`。

异步任务支持
任务可以异步执行，如果 `fn` 能做到以下其中一点：
接受一个callback
``` javascript
//在 shell 中执行一个命令
var exec = require('child_process').exec;
gulp.task('jekyll',function(cb) {
    //编译 Jekyll
    exec('jekyll build',function(err) {
        if(err) return cb(err); //返回 error
        cb();
    });
});
```

返回一个 stream
``` javascript
gulp.task('somename',function(){
    var stream = gulp.src('client/**/*.js')
        .pipe(minify())
        .pipe(gulp.dest('build'));
    return stream;
});
```

返回一个 promise
``` javascript
var Q = require('q');
gulp.task('somename',function(){
    var deferred = Q.defer();
    //执行异步的操作
    setTimeout(function(){
        deferred.resolve();
    },1);
    return deferred.promise;
});
```

注意：默认的，task将以最大的并发数执行，也就是说，gulp会一次性运行所有的task并且不做任何等待。如果你想要创建一个序列化的task队列，并以特定的顺序执行，你需要做两件事：
1.给出一个提示，来告知task什么时候执行完毕，
2.并且再给出一个提示，来告知一个task依赖另一个task的完成。

对于这个例子，让我们先假定你有两个task，'one'和'two'，并且你希望它们按照这个顺序执行：
1.在"one"中，你加入一个提示，来告知什么时候它会完成：可以在完成时返回一个callback，或者返回一个promise或stream，这样系统会去等待它完成。
2.在"two"中，你需要添加一个提示来告诉系统它需要依赖第一个task完成。

因此，这个例子的实际代码将会是这样：
``` javascript
var gulp = require('gulp');
//返回一个callback,因此系统可以知道它什么时候完成
gulp.task('one',function(cb){
    //做一些事 -- 异步的或者其他的
    cb(err); //如果err不是null或undefined，则会停止执行，且注意，这样代表执行失败了
});

//定义一个所依赖的 task 必须在这个task执行之前完成
gulp.task('two',['one'],function(){
    //'one' 完成后
});

gulp.task('default',['one','two']);
```
