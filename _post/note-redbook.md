[TOC]

# 第 1 章 JavaScript 简介
> 讲述了 JavaScript 的起源：因何而生，如何发展，现状如何。涉及的概念主要有 JavaScript 与 ECMAScript 之间的关系、DOM（Document Object Model，文档对象模型）、BOM（Browser Object Model，浏览器对象模型）。此外，还将讨论 ECMA（European Computer Manufacturer's Association，欧洲计算机制造商协会）和 W3C（World Wide Web Consortium，万维网联盟）指定的一些相关标准。

1、JavaScript 的含义比 ECMS-262 中规定的要多得多

- 核心（ECMAScript）
- 文档对象模型（DOM）
- 浏览器对象模型（BOM）

2、由 ECMA-262 定义的 ECMAScript 与 Web 浏览器没有依赖关系。Web 浏览器只是 ECMAScript 实现可能的宿主环境之一。其他宿主环境包括 Node（一种服务端 JavaScript 平台）和 Adobe Flash。

3、ECMA-262 的最近一版是第 5 版，发布于 2009 年。

4、文档对象模型（DOM，Document Object Model）是针对 XML 但经过扩展用于 HTML 的应用程序编程接口（API，Application Programming Interface）。

5、DOM1级（DOM Level 1）与 1998 年 10 月成为 W3C 的推荐标准
[关于 DOM 的发展历程](https://www.w3.org/TR/?tag=dom)

6、而 BOM 真正与众不同的地方（也是经常会导致问题的地方），还是它作为 JavaScript 实现的一部分但却没有相关的标准。这个问题在 HTML5 中得到了解决，HTML5 致力于把很多 BOM 功能写入正式规范

7、由于没有 BOM 标准可以遵循，因此每个浏览器都有自己的实现。虽然也存在一些事实标准，例如要有 window 对象和 navigator 对象等，但每个浏览器都会为这两个对象乃至其他对象定义自己的属性和方法。

## 第 1 章小结
1、DOM，提供访问和操作网页内容的方法和接口；BOM，提供与浏览器交互的方法和接口。
2、所有浏览器对 ECMAScript 第 3 版的支持大体上都还不错，而对 ECMAScript5 的支持程度越来越高，但对 DOM 的支持则彼此相差比较多。对已经正式纳入 HTML5 标准的 BOM 来说，尽管各浏览器都实现了某些众所周知的共同特性，但其他特性还是会因浏览器而异。

# 第 2 章 在 HTML 中使用 JavaScript
> 在 HTML 中使用 JavaScript 创建动态网页。这一章不仅展示了在网页中嵌入 JavaScript 的各种方式，还讨论了 JavaScript 内容类型（content-type）及其与 `<script>` 元素的关系。

1、HTML 4.0.1为 `<script>` 定义了下列 6 个属性：

- async：可选。表示应该立即下载脚本，但不应妨碍页面中的其他操作，比如下载其他资源或等待加载其他脚本。只对外部脚本文件有效。
- charset：可选。表示通过 src 属性执行的代码的字符集。由于大多数浏览器会忽略它的值，因此这个属性很少有人用。
- defer：可选。表示脚本可以延迟到文档完全被解析和显示之后再执行。只对外部脚本文件有效。
- language：已废弃。
- src：可选。表示包含要执行代码的外部文件。
- type：可选。可以看成是 language 的替代属性；表示编写代码使用的脚本语言的内容类型（也称为MIME类型）。实际上，服务器在传送 JavaScript 文件时使用的 MIME 类型通常是 application/x-javascript，但在 type 中设置这个值却可能导致脚本被忽略。目前 type 属性的值依旧还是 text/javascript。不过，这个属性并不是必需的，如果没有指定这个属性，则其默认值仍为 text/javascript。

2、在解释器对 `<script>` 元素内部的所有代码求值完毕以前，页面中的其余内容都不会被浏览器加载或显示。

3、`<script src="a.js"></script>` 标签之间不应该再包含额外的 JavaScript 代码。如果包含了嵌入的代码，则只会下载并执行外部脚本文件，嵌入的代码会被忽略。

4、另外，通过 `<script>` 元素的 src 属性还可以包含来自外部域的 JavaScript 文件。这一点既让 `<script>` 元素倍显强大，又让它备受争议。在这一点上，`<script>` 与 `<img>` 元素非常相似，即它的 src 属性可以是指向当前 HTML 页面所在域之外的某个域中的完整 URL。

5、无论如何包含代码，只要不存在 defer 和 async 属性，浏览器都会按照 `<script>` 元素在页面中出现的先后顺序对它们依次进行解析。换句话说，在第一个 `<script>` 元素包含的代码解析完成后，第二个 `<script>` 包含的代码才会被解析，然后才是第三个、第四个...

6、传统的做法，所有 `<script>` 元素都应该放在页面的 `<head>` 元素中，可是，在文档的 `<head>` 元素中包含所有 JavaScript 文件，意味着必须等到全部 JavaScript 代码都被下载、解析和执行完成以后，才能开始呈现页面的内容（浏览器在遇到 `<body>` 标签时才开始呈现内容）。对于那些需要很多 JavaScript 代码的页面来说，这无疑会导致浏览器在呈现页面时出现明显的延迟，而延迟期间的浏览器窗口中将是一片空白。为了避免这个问题，现在 Web 应用程序一般都把全部 JavaScript 引用放在 `<body>` 元素中页面内容的后面。
```
<body>
<!-- 这里放内容 -->
<script src="example1.js"></script>
</body>
```

7、HTML 4.0.1 为 `<script>` 标签定义了 defer 属性。这个属性的用途是表明脚本在执行时不会影响页面的构造。也就是说，脚本会被延迟到整个页面都解析完毕后再运行。因此，在 `<script>` 元素中设置 defer 属性，相当于告诉浏览器立即下载，但延迟执行。

# 第 3 章 基本概念

# 第 4 章 变量、作用域和内存问题

# 第 5 章 引用类型

# 第 6 章 面向对象的程序设计

# 第 7 章 函数表达式

# 第 8 章 BOM

# 第 9 章 客户端检测

# 第 10 章 DOM

# 第 11 章 DOM 扩展

# 第 12 章 DOM2 和 DOM3

# 第 13 章 事件

# 第 14 章 表单脚本

# 第 15 章 使用 Canvas 绘图

# 第 16 章 HTML5 脚本编程

# 第 17 章 错误处理与调试

# 第 18 章 JavaScript 与 XML

# 第 19 章 E4X

# 第 20 章 JSON

# 第 21 章 Ajax 与 Comet

# 第 22 章 高级技巧

# 第 23 章 离线应用与客户端存储

# 第 24 章 最佳实践

# 第 25 章 新兴的 API