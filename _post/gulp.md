[mean开发系列工具篇之gulp](http://www.jianshu.com/p/ca914c5ee4fc_

gulp入门初步--使用gulp压缩前端代码
http://www.5941740.cn/2016/02/19/gulp-learning/

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
