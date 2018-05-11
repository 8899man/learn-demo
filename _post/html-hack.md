1、连续英文字母及数字换行使用CSS换行。

用到的 css 属性 word-wrap 中 `word-wrap: break-word` 属性及值。

大家可能会遇到这种问题，但我们按照第三种方法来设置宽度来使内容换行，对于连续的数字和英文则无效，这时候就需要div css中对对应的div的css样式设置强制换行断行元素，`word-wrap:break-word;` 或者 `word-break: break-all;` 实现强制断行。

2、npm 安装插件命令行格式：`npm install [-g] [--save-dev]`
新建Gulp项目、安装Gulp步骤：
全局安装gulp以后再本地安装gulp插件：`npm install gulp --save-dev`
安装 `browser-sync` 插件：`npm install browser-sync --save-dev`
gulp-watch 好像是不用安装？

3、移动端输入框有边框内阴影
```
-webkit-appearance: none;
-moz-appearance: none;
appearance: none;
```

4、移动端浏览器 select 样式要修改的话，加上：
```
-webkit-appearance: none;
-moz-appearance: none;
appearance: none;
```

5、移动端按钮/输入框/文本域点击/长按有阴影
``` css 
-webkit-tap-highlight-color: transparent;
or
-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
```

6、输入框/文本域选中后有边框
```
outline: none;
```

8、PC上面输入框缓存用户输入，而且选择缓存的内容到输入框后，输入框有黄色背景
``` html
<!-- 最简单的做法就是不要自动补全的功能-->
<input type="text" autocomplete="off">
```

9、去掉移动端文字选中阴影和选项
```
-webkit-touch-callout: none;
```

10、关于PC网页上文本内容默认可以用鼠标选中有蓝色背景，如果不需要可以在css中添加
```
-moz-user-select: none; /*火狐*/
-webkit-user-select: none; /*webkit浏览器*/
-ms-user-select: none; /*IE10*/
-khtml-user-select: none; /*早期浏览器*/
user-select: none;
```

11、正则表达式限制输入框只能输入数字代码如下： 
``` html
<input type="text" onkeyup="this.value=this.value.replace(/[^\d]/g,'') " onafterpaste="this.value=this.value.replace(/[^\d]/g,'') " name="f_order" value="1"/> 
```
其中，onafterpaste防止用户从其它地方copy内容粘贴到输入框 

12、js-onpaste实例
下面的例子演示了一个常用的应用，就是禁止向文本域黏贴内容：
``` html
<html>
<body>
<input type="text" onpaste="return false;" />
</body>
</html>
```
在该例子中，利用return false 阻止了黏贴这一行为。在实际应用中，当有一些比较重要的数据时，如手机号、登录密码、网银账号等，为了安全考虑必须手动输入，因此在这些表单文本域，通常是设置为禁止黏贴的。

13、取消手机点击时出现的灰块
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

14、去掉点击链接和文本框对象时默认的灰色半透明覆盖层（ios）或者虚框（android）移动端网站或APP点击后出现闪动或灰色背景|只需对绑定事件添加class样式使其触发事件时背景为透明色
```
.class {
  -webkit-tap-highlight-color:transparent;
  -webkit-tap-highlight-color:rgba(0,0,0,0); //透明度设置为0
}
```

15、月份
```
一月：January  二月：February 三月：March  四月：April
五月：May  六月：June 七月：July 八月：August
九月：September  十月：October  十一月：November  十二月：December
```

16、网页中的宽高
```
网页可见区域宽： document.body.clientWidth; 
网页可见区域高： document.body.clientHeight; 
网页可见区域宽： document.body.offsetWidth (包括边线的宽); 
网页可见区域高： document.body.offsetHeight (包括边线的宽); 
网页正文全文宽： document.body.scrollWidth; 
网页正文全文高： document.body.scrollHeight; 
网页被卷去的高： document.body.scrollTop; 
网页被卷去的左： document.body.scrollLeft; 
网页正文部分上： window.screenTop; 
网页正文部分左： window.screenLeft; 
屏幕分辨率的高： window.screen.height; 
屏幕分辨率的宽： window.screen.width; 
屏幕可用工作区高度： window.screen.availHeight;
```

17、正则表达式限制输入框只能输入数字：
```
<input type="text" onkeyup="this.value=this.value.replace(/[^\d]/g,'')" onafterpaste="this.value=this.value.replace(/[^\d]/g,'')" name="f_order" value="1"/> 
其中，onafterpaste防止用户从其它地方copy内容粘贴到输入框
```

18、我的linux命令
```
ssh 连不上：service iptables stop
ssh 关机命令：shutdown -h now 立刻关机（root用户使用）
```

