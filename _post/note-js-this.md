# JavaScript 中的 this，真的太重要了


与其他语言相比，**函数的 `this` 关键字**在 JavaScript 中的表现略有不同，此外，在 严格模式 和 非严格模式之间也会有一些差别。

> 有什么差别呢？


在绝大多数情况下，函数的调用方式决定了 `this` 的值。`this` 不能再执行期间被赋值，并且在每次函数被调用时 `this` 的值也可能会不同。ES5 引入了 bind 方法来设置函数的 `this` 值，[关于bind和call可以看我的文章]()，而不用考虑函数如何被调用的，ES2015 引入了支持 `this` 词法解析的箭头函数（它在闭合的执行上下文内设置 `this` 的值）。

## 全局上下文
无论是否在严格模式下，在全局执行上下文中（在任何函数体外部）`this` 都指代全局对象。【在全局执行上下文中this都是全局对象window】

## 函数上下文
在函数内部，`this` 的值取决于函数被调用的方式。【取决于被调用的方式】

#### 简单调用
【在严格模式下，`this` 将保持他进入执行上下文时的值】
```
function f1() {
    return this;
}
// 在浏览器中
f1() === window;  // 在浏览器中，全局对象是widnow

// 在 Node 中
f1() === global;
```

```
function f2(){
  "use strict"; // 这里是严格模式
  return this;
}
f2() === undefined; // true

在严格模式下，this将保持他进入执行上下文时的值，所以下面的this将会默认为undefined。
```

所以，在严格模式下，如果 `this` 没有被执行上下文（execution context）定义，那它将保持为 `undefined`。

因为 f2() 是被直接调用的，而不是作为对象的属性或方法调用的（如`window.f2()`）。有一些浏览器最初在支持严格模式时没有正确实现这个功能，于是它们错误的返回了 `window` 对象。

但是，如果用 window 来调用的话，this 就是 window了。
```
function f2(){
  "use strict"; // 这里是严格模式
  return this;
}
console.log(window.f2())  // window
```

【如果要想把 `this` 的值从一个上下文传到另一个，就要用 `call` 或者 `apply` 方法】

【当一个函数在其主体中使用 `this` 关键字时，可以通过使用函数继承自 `Function.prototype` 的 `call` 或 `apply` 方法将 `this` 值绑定到调用中的特定对象】

```
function add(c, d) {
  return this.a + this.b + c + d;
}

var o = {a: 1, b: 3};

// 第一个参数是作为‘this’使用的对象
// 后续参数作为参数传递给函数调用
add.call(o, 5, 7); // 1 + 3 + 5 + 7 = 16

// 第一个参数也是作为‘this’使用的对象
// 第二个参数是一个数组，数组里的元素用作函数调用中的参数
add.apply(o, [10, 20]); // 1 + 3 + 10 + 20 = 34
```

【使用 `call` 和 `apply` 函数的时候要注意，如果传递给 `this` 的值不是一个对象，JavaScript 会尝试使用内部 `ToObject` 操作将其转换为对象。】
```
因此，如果传递的值是一个原始值比如 7 或 'foo'，那么就会使用相关构造函数将它转换为对象，所以原始值 7 会被转为对象，像 
new Number(7) 这样，而字符串 'foo' 转化成 new String('foo') 这样。
```

## bind 方法

ECMAScript 5 引入了 Function.prototype.bind。调用 f.bind(someObject) 会**创建**一个与 f 具有相同函数体和作用域的函数，但是在这个新函数中，this 将永久地被绑定到了 bind 的第一个参数，无论这个函数是如何被调用的。

【this 将永久的被绑定到了 bind 的第一个参数，无论这个函数是如何被调用的】

```
function f(){
  return this.a;
}

var g = f.bind({a:"azerty"});
console.log(g()); // azerty

var h = g.bind({a:'yoo'}); // bind只生效一次！
console.log(h()); // azerty

var o = {a:37, f:f, g:g, h:h};
console.log(o.f(), o.g(), o.h()); // 37, azerty, azerty
```

## 箭头函数
在箭头函数中，`this` 与封闭词法上下文的 `this` 保持一致。在全局代码中，它将被设置为全局对象。【封闭词法上下文】【也就是包裹这个函数的上下文】
```
var foo = (() => this);

// 接着上面的代码
// 作为对象的一个方法调用
var obj = {foo: foo};
console.log(obj.foo() === window); // true

// 尝试使用call来设定this
console.log(foo.call(obj) === window); // true

// 尝试使用bind来设定this
foo = foo.bind(obj);
console.log(foo() === window); // true

```

【无论如何，`foo` 的 `this` 被设置为**他被创建时的上下文**（在上面的例子中，就是全局对象）】
这同样适用于在其他函数内创建的箭头函数：这些箭头函数的 `this` 被设置为封闭的词法上下文的。

## 作为对象的方法
【当函数作为对象里的方法被调用时，它们的 `this` 是调用该函数的对象】

`this` 的绑定只受最靠近的成员引用的影响。在下面的例子中，我们把一个方法 `g` 当做对象 `o.b` 的函数调用。在这次执行期间，函数中的 `this` 将指向 `o.b` 。事实证明，这与他是对象 `o` 的成员没有多大关系，最靠近的引用才是最重要的。
```
o.b = { g: independent, prop: 42 }
console.log(o.b.g())
```

## 原型链中的 `this`
对于在对象原型链上某处定义的方法，同样的概念也适用。如果该方法存在于一个对象的原型链上，那么 `this` 指向的是调用这个方法的对象，就像该方法在对象上一样。

```
var o = {
  f: function() { 
    return this.a + this.b; 
  }
};
var p = Object.create(o);
p.a = 1;
p.b = 4;

console.log(p.f()); // 5
```

在这个例子中，对象p没有属于它自己的f属性，它的f属性继承自它的原型。虽然在对 f 的查找过程中，最终是在 o 中找到 f 属性的，这并没有关系；查找过程首先从 p.f 的引用开始，所以函数中的 this 指向p。也就是说，因为f是作为p的方法调用的，所以它的this指向了p。这是 JavaScript 的原型继承中的一个有趣的特性。

## 作为构造函数
当一个函数用作构造函数时（适用 new 关键字），它的 `this` 被绑定到正在构造的新对象。

【虽然构造器返回的默认值是this所指的那个对象，但它仍可以手动返回其他的对象（如果返回值不是一个对象，则返回this对象）】

```
/*
 * 构造函数这样工作:
 *
 * function MyConstructor(){
 *   // 函数实体写在这里
 *   // 根据需要在this上创建属性，然后赋值给它们，比如：
 *   this.fum = "nom";
 *   // 等等...
 *
 *   // 如果函数具有返回对象的return语句，
 *   // 则该对象将是 new 表达式的结果。 
 *   // 否则，表达式的结果是当前绑定到 this 的对象。
 *   //（即通常看到的常见情况）。
 * }
 */

function C(){
  this.a = 37;
}

var o = new C();
console.log(o.a); // 37


function C2(){
  this.a = 37;
  return {a:38};
}

o = new C2();
console.log(o.a); // 38

```

> 在刚刚的例子中（C2），因为在调用构造函数的过程中，手动的设置了返回对象，与this绑定的默认对象被丢弃了。（这基本上使得语句 “this.a = 37;”成了“僵尸”代码，实际上并不是真正的“僵尸”，这条语句执行了，但是对于外部没有任何影响，因此完全可以忽略它）。


## 作为一个 DOM 事件处理函数
> 当函数被用作事件处理函数时，它的 `this` 指向触发事件的元素（一些浏览器在使用非 `addEventListener` 的函数动态添加监听函数时不遵守这个约定）。

```
// 被调用时，将关联的元素变成蓝色
function bluify(e){
  console.log(this === e.currentTarget); // 总是 true

  // 当 currentTarget 和 target 是同一个对象时为 true
  console.log(this === e.target);        
  this.style.backgroundColor = '#A5D9F3';
}

// 获取文档中的所有元素的列表
var elements = document.getElementsByTagName('*');

// 将bluify作为元素的点击监听函数，当元素被点击时，就会变成蓝色
for(var i=0 ; i<elements.length ; i++){
  elements[i].addEventListener('click', bluify, false);
```


## 作为一个内联事件处理函数
> 当代码被内联 on-event 处理函数 调用时，它的 `this` 指向监听器所在的 DOM 元素

```
<button onclick="alert(this.tagName.toLowerCase());">
  Show this
</button>
```

上面的 alert 会显示button。注意只有外层代码中的this是这样设置的：

```
<button onclick="alert((function(){return this})());">
  Show inner this
</button>
```

在这种情况下，没有设置内部函数的this，所以它指向 global/window 对象（即非严格模式下调用的函数未设置this时指向的默认对象）。