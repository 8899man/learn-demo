## 数据判断
javascript 中数据判断（underscore）
```
1194 _.isElement = function(obj) {
  return !!(obj && obj.nodeType === 1);   
};
判断是否为dom，dom的nodeType属性值为1。这里用!!强转为boolean值。

1200 _.isArray = nativeIsArray || function(obj) {
  return toString.call(obj) === '[object Array]';
};
判断是否为数组。由于Array.isArray函数是ECMAScript 5新增函数，所以为了兼容以前的版本，在原生判断函数不存在的情况下，后面重写了一个判断函数。用call函数来改变作用域可以避免当obj没有toString函数报错的情况。

1205 _.isObject = function(obj) {
  var type = typeof obj;
  return type === 'function' || type === 'object' && !!obj;
};
判断是否为对象。先用typeof判断数据类型。函数也属于对象，但是由于typeof null也是object，所以用!!obj来区分这种情况。

1219 if(!_.isArguments(arguments)) {
  _.isArguments = function(obj) {
    return _.has(obj, 'callee');
  };
}
判断是否为 arguments，很简单，arguments有个特有属性 callee。

1239 _.isNaN = function(obj) {
  return _.isNumber(obj) && obj !== +obj;
};
NaN这个值有两个特点：1.它是一个数；2.不等于它自己。
'+'放在变量前面一般作用是把后面的变量变成一个数，在这里已经判断为一个数仍加上'+'，是为了把 var num = new Number() 这种没有值的数字也归为NaN。

1244 _.isBoolean = function(obj) {
  return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
};
是不是以为如果是布尔值不是true就是false？还有第三种情况 var b = new Boolean()。b也是布尔值。

1254 _.isUndefined = function(obj) {
  return obj === void 0;
};
用 void 0 来表示 undefined，非常有意思的小技巧。不过常用方式还是if(xxx)来判断是不是undefined。

eq是underscore的一个内置函数，代码太长，不粘贴了。isEmpty调用了这个函数。整个思路由易到难，先用===比较简单数据，然后用toString来判断是否相等，最后用递归处理复杂的Array，Function和Object对象。

1091 if(a===b) return a !== 0 || 1 / a === 1 / b;

这里为了区分 '+0' 和 '-0'，因为这两个数对计算结果是有影响的。
```



