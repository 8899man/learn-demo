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


