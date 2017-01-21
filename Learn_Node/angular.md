首先声明并不是说所有的都要做博客，这篇是一个个人学习的笔记内容，并不能做博客文章。
正如你所看到的,AngularJS指令是以ng作为前缀的 HTML 属性。
ng-init 指令初始化 AngularJS 应用程序变量。
``` html
<div ng-app="" ng-init="firstName='John'">
  <p>姓名为 <span ng-bind="firstName"></span></p>
</div>
```

HTML5 允许扩展的(自制的)属性,以data-开头。
AngularJS属性以 ng- 开头,但是你可以使用 data-ng- 来让网页对 HTML5 有效。

##### 带有效的 HTML5：
``` html
<div data-ng-app="" data-ng-init="firstName='John'">
  <p>姓名为 <span data-ng-bind="firstName"></span></p>
</div>
```


## AngularJS应用
- AngularJS 模块(module) 定义了 AngularJS应用。
- AngularJS 控制器(Controller) 用于控制 AngularJS 应用。
- ng-app指令定义了应用，ng-controller定义了控制器。

## AngularJS 指令
- AngularJS 通过被称为 指令 的新属性来扩展 HTML。
- AngularJS 通过内置的指令来为应用添加功能。
- AngularJS 允许你自定义指令。
- ng-app 指令初始化一个 AngularJS 应用程序。
- ng-init 指令初始化应用程序数据。
- ng-model 指令把元素值(比如输入域的值)绑定到应用程序。

``` html
<div ng-app="" ng-init="firstName='John'">
  <p>在输入框中尝试输入：</p>
  <p>姓名：<input type="text" ng-model="firstName"></p>
  <p>你输入的为：{{ firstName }}</p>
</div>
```

> ng-app 指令告诉AngularJS，`<div>` 元素是 AngularJS 应用程序的“所有者”。
> 一个网页可以包含多个运行在不同元素中的 AngularJS 应用程序。

{{ firstName }} 是通过 ng-model="firstName" 进行同步，两者相互绑定。

#### 重复 HTML 元素
ng-repeat 指令会重复一个 HTML 元素：
``` html
<div ng-app="" ng-init="names=[
  {name:'Jani',country:'Norway'},
  {name:'Hege',country:'Sweden'},
  {name:'Kai',country:'Denmark'}]">
  <p>循环对象：</p>
  <ul>
    <li ng-repeat="x in names">
      {{ x.name + ',' + x.country}}
    </li>
  </ul>
</div>
```

> AngularJS 完美支持数据库的 CRUD (增加Create、读取Read、更新Update、删除Delete)应用程序。
> 把实例中的对象想象成数据库中的记录。


#### ng-app 指令
ng-app 指令定义了 AngularJS 应用程序的 根元素。
ng-app 指令在网页加载完毕时会自动引导(自动初始化)应用程序。

#### ng-init 指令
ng-init 指令为 AngularJS 应用程序定义了 初始值。
通常情况下，不适用 ng-init。你将使用一个控制器或模块来代替它。

#### ng-model 指令
ng-model 指令绑定 HTML 元素到应用程序数据。
ng-model 指令也可以：

- 为应用程序数据提供类型验证(numbr、email、required)。
- 为应用程序数据提供状态(invalid、dirty、touched、error)。
- 为 HTML 元素提供 CSS 类。
- 绑定 HTML 元素到 HTML 表单。


#### ng-repeat 指令
ng-repeat 指令对于集合中(数组中)的每个项会 克隆一次 HTML 元素。

#### 创建自定义的指令
除了 AngularJS 内置的指令外，我们还可以创建自定义指令。
你可以使用 .directive 函数来添加自定义的指令。
要调用自定义指令，HTML 元素上需要添加自定义指令名。
使用驼峰法来命名一个指令，runoobDirective，但在使用它时需要以 - 分割，runoob-directive
``` html
<div ng-app="myApp">
  <runoob-directive ></runoob-directive>  
</div>

<script>
  var app = angular.module("myApp",[]);
  app.directive("runoobDirective", function() {
    return {
      template: "<h1>自定义指令！</h1>"
    }
  });
</script>
```
你可以通过以下方式来调用指令：

- 元素名
- 属性
- 类名
- 注释






