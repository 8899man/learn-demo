多说即将关闭，之前的修改应该都不要了，准备清掉跟多说相关的修改。



关于博客评论区的用户标识颜色块的制作，[https://jetyu.github.io/2016/11/04/20161104/](https://jetyu.github.io/2016/11/04/20161104/)
博客中引入了 `embed.js` ，来源是 所说的静态文件。
引入的地方是： `\next\layout\_scripts\third-party\comments\duoshuo.swing` 9-20行。
现在要做的是 将这个 `embed.js` 文件本地化，也就是说将 `embed.js` 放到咋们自己的目录结构下面来，然后还要对其做一点小改动。

在做这个UA样式之前，我们先把之前的多说CSS样式写到本地的 `custom.styl` 下来。
然后参考一下这个：[https://wsgzao.github.io/post/duoshuo/#%E6%9C%AC%E5%9C%B0%E5%8C%96embed-js](https://wsgzao.github.io/post/duoshuo/#%E6%9C%AC%E5%9C%B0%E5%8C%96embed-js)，看一下图像水平翻转要不要。

然后就是本地化 `embed.js` ，[这篇文章](https://jetyu.me/2014/04/24/20140424/#comments)也有提到本地化embed.js的做法，结合两篇文章，搞一下这个本地化 `embed.js`。

最后就是 多说后台自定义 CSS ，我们还是放在自己的本地 `custom.styl` 下。

最后还有这篇：[[多说]不本地化embed.js使多说评论显示UA](http://easun.org/blog/archives/make_duoshuo_show_ua.html)