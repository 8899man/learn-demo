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
      // restrict: "ECMA",
      // replace: true,
      template: "<h1>自定义指令！</h1>"
    }
  });
</script>
```
你可以通过以下方式来调用指令：

- 元素名
`<runoob-directive></runoob-directive>`
- 属性
`<div runoob-directive></div>`
- 类名
`<div class="runoob-directive"></div>`
- 注释
`<!-- directive: runoob-direvtive -->`


#### 限制使用
你可以限制你的指令只能通过特定的方式来调用。
restrict 值可以是以下几种：

- E 作为元素名使用
- A 作为属性使用
- C 作为类名使用
- M 作为注释使用

restrict 默认值为 EA，即可以通过元素名和属性名来调用指令。
<b>如果作为注释使用，则需要在该实例添加 replace 属性，否则评论是不可见的。</b>

#### ng-model 指令
ng-modal 指令可以将输入域的值与AngularJS创建的变量绑定
``` html
<div ng-app="myApp" ng-controller="myCtrl">
  名字： <input type="text" ng-model="name">
  <p>你输入了： {{ name }}</p>
</div>

<script>
  var app = angular.module('myApp', []);
  app.controller('myCtrl', function($scope){
    $scope.name = "John Doe";
  });
</script>
```

验证用户输入
``` html
<form ng-app="" name="myForm">
  Email:
  <input type="email" name="myAddress" ng-model="text">
  <span ng-show="myForm.myAddress.$error.email">不是一个合法的邮箱地址</span>
</form>
```

#### 应用状态
ng-modal 指令可以为应用数据提供状态值(invalid、dirty、touched、error)

- Valid: true (如果输入的值是合法的则为 true)
- Dirty: false (如果值改变则为 true)
- Touched: false (如果通过触屏点击则为 true)

#### CSS 类
ng-model 指令基于它们的状态为 HTML 元素提供了 CSS 类。
ng-model 指令根据表单域的状态添加/移除一下类：

- ng-empty
- ng-not-empty
- ng-touched
- ng-valid
- ng-invalid
- ng-dirty
- ng-pending
- ng-pristine

#### AngularJS Scope(作用域)
Scope(作用域)是应用在 HTML(视图) 和 JavaScript(控制器) 之间的纽带。
Scope是一个对象，有可用的方法和属性。
Scope可应用在视图和控制器上。

#### Scope 作用范围
了解你当前使用的 scope 是非常重要的。
在之前的实例中，只有一个作用域 scope，所以处理起来比较简单，但在大型项目中，HTML DOM 有多个作用域，这时你就需要知道你使用 scope 对应的作用域是哪一个。
``` html
<scirpt>
  var app = angular.module('myApp', []);
  app.controller('myCtrl', function($scope) {
    $scope.names = ["Emil", "Tobias", "Linus"];
  });
</scirpt>
```

#### 根作用域
所有的应用都有一个 $rootScope，它可以作用在 ng-app 指令包含的所有 HTML 元素中。
$rootScope 可作用于整个应用中。是各个 controller 中 scope 的桥梁。用 rootscope 定义的值，可以在各个 controller 中使用。
``` html
<script>
  app.controller('myCtrl', function($scope, $rootScope) {
    $scope.names = ["Emil", "Tobias", "Linus"];
    $rootScope.lastname = "Refsnes";
  });
</script>
```

#### AngularJS 控制器
AngularJS 应用程序被控制器控制。


#### 外部文件中的控制器
在大型的应用程序中，通常是把控制器存储在外部文件中。
只需要把 `<scipt>` 标签中的代码复制到名为 personController.js 的外部文件中即可。

#### AngularJS 过滤器
过滤器可以使用一个管道字符(|)添加到表达式和指令中。
AngularJS 过滤器可用于转换数据：

|过滤器|描述|
|:--- | ---:|
|currency|格式化数字为货币格式|
|filter|从数组项选择一个子集|
|lowercase|格式化字符串为小写|
|orderBy|根据某个表达式排列数组|
|uppercase|格式化字符串为大写|

``` html
<p> 姓名为 {{ lastName | lowercase }} </p>
```

##### 向指令添加过滤器
orderBy 过滤器根据表达式排列数组：

``` html
<ul>
  <li ng-repeat="x in names | orderBy:'country'">
    {{ x.name + ',' + x.country }}
  </li>
</ul>
```




##### 过滤输入
输入过滤器可以通过一个管道字符(|)和一个过滤器添加到指令中，该过滤器后跟一个冒号和一个模型名称。
filter 过滤器从数组中选择一个子集：
``` html
<div ng-app="myApp" ng-controller="namesCtrl">
<p><input type="text" ng-model="test"></p>
<ul>
  <li ng-repeat="x in names | filter:test | orderBy:'country'">
    {{ (x.name | uppercase) + ',' + x.country }}
  </li>
</ul>
</div>
```















