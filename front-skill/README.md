# 前端小知识点&技巧

## 浏览器
Chrome 有很多实用的小细节，比如地址栏输入 zhihu.com 然后按 tab 建，则直接开启在知乎的搜索

## HTML

一份关于html中`<head>`部分的清单：
[https://github.com/Amery2010/HEAD](https://github.com/Amery2010/HEAD)
[https://github.com/joshbuchea/HEAD](https://github.com/joshbuchea/HEAD)

## CSS
1、使用css追踪用户是否点击某个链接
```
#link2:active::after {
  content: url("track.php?action=link2_alicked");
}
```

2、
新的CSS3颜色格式和透明度
1.RGB(红绿蓝)
   color:rgb(254,2,8);
2.HSL颜色(色相、饱和度、亮度)（P131页）
HSL模式基于一个360度的色相环，60度时为黄色，120度时为绿色，180度时为青色，240度时为蓝色，300度时为洋红色，360度时为红色。
版本9以下的IE浏览器不支持RGB和HSL。因此，如果需要针对这些浏览器提供备用的颜色声明,则要将其放在RGB或HSL值之前。

HSL和RGB与十六进制颜色值最大的区别，是它们支持透明通道。这意味着可以让元素透明，使其下方的元素可见。
background-color:rgba(255,255,255,0.8);
--------
为什么不适用opacity
这种透明度与RGBA与HSLA有所不同，这种方式设置的透明度会对整个元素产生影响(元素的内容都会透明)。
反之，适用HSLA或RGBA则可以仅让元素的某些部分有透明效果。这样，一个元素可以带有HSLA透明背景，但内部文字仍然不透明。

## JavaScript

1、去除数组的重复成员
```
let unique = [...new Set(array)]
```
*ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值*
```
// 去除数组重复成员的另一种方法
Array.from(new Set(array))
```

2、undefined 的几种表示方法
void 0 == undefined  void 0 === undefined
typeof yu == 'undefined'  typeof yu === 'undefined'

3、获取select元素中的option
var country = cc.options[cc.selectedIndex].dataset.country;

4、一个简单的日期format —— 来源微信小程序
```
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
}
```


## Linux
```
linux ssh 连不上（service iptables stop）
```


