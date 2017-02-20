1、连续英文字母及数字换行使用CSS换行。用到的css属性word-wrap中`word-wrap: break-word`属性及值。大家可能会遇到这种问题，但我们按照第三种方法来设置宽度来使内容换行，对于连续的数字和英文则无效，这时候就需要div css中对对应的div的css样式设置强制换行断行元素，`word-wrap:break-word;` 或者 `word-break: break-all;` 实现强制断行。

2、npm 安装插件命令行格式：`npm install [-g] [--save-dev]`
    新建Gulp项目、安装Gulp步骤：
        全局安装gulp以后再本地安装gulp插件：`npm install gulp --save-dev`
        安装 `browser-sync` 插件：`npm install browser-sync --save-dev`
        gulp-watch 好像是不用安装？

3、移动端按钮/输入框/文本域长按有阴影
``` css 
-webkit-tap-highlight-color: transparent;
or
-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
```

4、输入框/文本域选中后有边框
```
outline: none;
```

4、PC上面输入框缓存用户输入，而且选择缓存的内容到输入框后，输入框有黄色背景
``` html
<!-- 最简单的做法就是不要自动补全的功能-->
<input type="text" autocomplete="off">
```

4、去掉移动端文字选中阴影和选项
```
-webkit-touch-callout: none;
```

5、关于PC网页上文本内容默认可以用鼠标选中有蓝色背景，如果不需要可以在css中添加
```
-moz-user-select: none; /*火狐*/
-webkit-user-select: none; /*webkit浏览器*/
-ms-user-select: none; /*IE10*/
-khtml-user-select: none; /*早期浏览器*/
user-select: none;
```

6、正则表达式限制输入框只能输入数字代码如下： 
``` html
<input type="text" onkeyup="this.value=this.value.replace(/[^\d]/g,'') " onafterpaste="this.value=this.value.replace(/[^\d]/g,'') " name="f_order" value="1"/> 
```
其中，onafterpaste防止用户从其它地方copy内容粘贴到输入框 

7、js-onpaste实例
下面的例子演示了一个常用的应用，就是禁止向文本域黏贴内容：
``` html
<html>
  <body>
    <input type="text" onpaste="return false;" />
  </body>
</html>
```
在该例子中，利用return false 阻止了黏贴这一行为。在实际应用中，当有一些比较重要的数据时，如手机号、登录密码、网银账号等，为了安全考虑必须手动输入，因此在这些表单文本域，通常是设置为禁止黏贴的。

8、取消手机点击时出现的灰块
``` html
html,body {
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color:rgba(0,0,0,0);
}
a,div {
    -webkit-tap-highlight-color: transparent; 
    -moz-tap-highlight-color: transparent; 
    -ms-tap-highlight-color: transparent; 
    -o-tap-highlight-color: transparent; 
    tap-highlight-color: transparent;
}
```

