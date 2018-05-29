# 前端小知识点&技巧

## HTML

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


