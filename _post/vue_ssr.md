# 纯技术

网站典型的两种设计，一种是全屏流体设计，另一种是固屏流体设计。下面有几个代表网站：

全屏类：
1、腾讯新闻：http://wx.qq.com
2、途牛旅游：http://m.tuniu.com

固屏类：
1、京东商城：http://m.jd.com
2、淘宝网：http://m.taobao.com

如果只是兼容移动手机端，那么不管是固屏还是全屏都一样。从设计难度上来说，固屏貌似更容易一点点，因为全屏设计，在电脑上设计，完全放大又失真，设计起来比较难受，我们这里推荐使用固屏。

在进行移动端开发的时候，参考的最小屏幕宽度是320px，小于320px，去适配的话，意义不大。

// 窗口设定
name="viewport"

// 页面大小屏幕等宽
width=device-width

// 初始缩放比例，1.0表示原始比例大小
initial-scale=1.0

// 允许缩放的最小比例
minimum-scale=1.0

// 允许缩放的最大比例
maximun-scale=1.0

// 用户是否可以缩放，这里 no 表示不可以
user-scalable=no

上面最大最下比例其实就已经限制了无法缩放了，和最后一个是否可以缩放有同样的功能。

# Vue