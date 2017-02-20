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



##### AngularJS服务
> AngularJS中你可以创建自己的服务，或使用内建服务

###### 什么是服务？
在 AngularJS 中，服务是一个函数或对象，可在你的 AngularJS 应用中使用。
AngularJS 内建了 30 多个服务。
有个 $location 服务，它可以返回当前页面的 URL 地址。
` $location.absUrl();`

###### 为什么使用服务？
在很多服务中，比如 **$location** 服务，它可以使用 DOM 中存在的对象，类似 window.location 对象，但 window.location 对象在 AngularJS 应用中有一定的局限性。
AngularJS 会一直监控应用，处理事件变化，AngularJS 使用 $location 服务比使用 window.location 对象更好。

** $location VS window.location **

| | window.location | $location.service |
|:---|:---|:---|
|目的|允许对当前浏览器位置进行读写操作|允许对当前浏览器位置进行读写操作|
|API|暴露一个"裸聊"的能被读写的对象|暴露jquery风格的读写器|
|是否在AngularJS应用声明周期中和应用整合|否|可获取到应用声明周期内的每一个阶段，并且和$watch整合|
|是否和HTML5 API的无缝整合|否|是(对低级浏览器优雅降级)|
|和应用的上下文是否相关|否,window.location.path返回"/docroot/actual/path"|是，$location.path()返回"/actual/path"|



##### $http 服务
> $http 是 AngularJS 应用中最常用的服务。服务向服务器发送请求，应用响应服务器传过来的数据。

> $http 是 AngularJS 中的一个核心服务，用于读取远程服务器的数据。

AngularJS $http 是一个用于读取 web 服务器上的数据的服务。
$http.get(url)是用于读取服务器数据的函数。

``` html
<div ng-app="myApp" ng-controller="myCtrl">
  <p>欢迎信息</p>
  <h1>{{ myWelcome }}</h1>
</div>

<script>
  var app = angular.module('myApp', []);
  app.controller('myCtrl', function($scope, $http){
    $http.get('test.php').then(function(response){
      $scope.myWelcome = response.data;
    });
  });
</script>
```

``` javascript
$http.get("test.php").success(function(response) {
  $scope.names = response.sites();
});
```

##### $timeout 服务
AngularJS $timeout 服务对应了 JS ** window.setTimeout ** 函数。
``` html
<div ng-app="myApp" ng-controller="myCtrl">
  <p>两秒后显示信息</p>
  <h1>{{ myHeader }}</h1>
</div>

<script>
  var app = angular.module('myApp', []);
  app.controller('myCtrl', function($scope, $timeout){
    $scope.myHeader = 'Hello World';
    $timeout(function(){
      $scope.myHeader = 'how are you today?';
    },2000);
  });
</script>
```

##### $interval 服务
AngularJS $interval 服务对应了 JS ** window.setInterval ** 函数。
``` html
<div ng-app="myApp" ng-controller="myCtrl">
  <p>现在时间是</p>
  <h1>{{ theTime }}</h1>
</div>

<script>
  var app = angular.module('myApp', []);
  app.controller('myCtrl', function($scope, $interval){
    $scope.thetime = new Date().toLocaleTimeString();
    $interval(function(){
      $scope.theTime = new Date().toLocaleTimeString();
    },1000);
  });
</script>
```

##### 创建自定义服务
你可以创建访问自定义服务，链接到你的模块中：
创建名为 ** hexafy ** 的服务：
``` javascript
app.service('hexafy', function() {
  this.myFunc = function (x) {
    return x.toString(16);
  }
});
```
要使用访问自定义服务，需要在定义过滤器的时候独立添加：
```
app.controller('myCtrl', function($scope, hexafy) {
  $scope.hex = hexafy.myFunc(255);
});
```

##### 过滤器中，使用自定义服务
当你创建了自定义服务，并连接到你的应用上后，你可以在控制器，指令，过滤器或其他服务中使用它。
``` html
<div ng-app="myApp">
在过滤器中使用服务
<h1>{{ 255 | myFormat }}</h1>
</div>
<script>
  var app = angular.module('myApp', []);
  app.service('hexafy', function() {
    this.myFunc = function(x) {
      return x.toString(16);
    }
  });
  app.filter('myFormat', ['hexafy', function(hexafy){
    return function(x) {
      return hexafy.myFunc(x);
    }
  }]);
</script>
```

###### 在对象数组中获取值时你也可以使用过滤器。



##### AngularJS Select(选择框)
AngularJS 可以使用数组或对象创建一个下拉列表选项。

###### 使用 ng-options 创建选择框
在AngularJS 中我们可以使用 ng-option 指令来创建一个下拉列表，列表项通过对象和数组循环输出，如下实例：
``` html
<div ng-app="myApp" ng-controller="myCtrl">
  <select name="" id="" ng-init="selectedName = names[1]" ng-model="selectedName" ng-options="x for x in names"></select>
</div>

<script>
  var app = angular.module('myApp', []);
  app.controller('myCtrl', function($scope){
    $scope.names = ["Google", "Runoob", "Taobao"];
  });
</script>
```

###### 我们也可以使用 ng-repeat 指令来创建下拉列表：
``` html
<div ng-app="myApp" ng-controller="myCtrl">
  <select name="" id="">
    <option ng-repeat="x in names">{{ x }}</option>
  </select>
</div>

<script>
  var app = angular.module('myApp', []);
  app.controller('myCtrl', function($scope) {
    $scope.names = ['Google', 'Runoob', 'Taobao'];
  });
</script>
```

##### 应该用哪个更好？
ng-repeat 指令是通过数组来循环 HTML 代码来创建下拉列表，但 ng-options 指令更适合创建下拉列表，它有以下优势：

- 使用 ng-options 的选项的一个对象，ng-repeat 是一个字符串。
- ng-repeat 有局限性，选择的值是一个字符串


使用ng-options 指令，选择的是一个对象：
当选择值是一个对象是，我们就可以获取更多信息，应用也更灵活。
使用对象作为数据源，x为键(key),y为值(value)。
你选择的值为在 key-value 对中的 value。
value 在 key-value 对中也可以是个对象。
在下拉菜单也可以不使用 key-value 对中的 key,直接使用对象的属性：
``` html
<div ng-app="myApp" ng-controller="myCtrl">
<p>选择一辆车:</p>
<select ng-model="selectedCar" ng-options="y.brand for (x, y) in cars"></select>
<p>你选择的是: {{selectedCar.brand}}</p>
<p>型号为: {{selectedCar.model}}</p>
<p>颜色为: {{selectedCar.color}}</p>

<p>下拉列表中的选项也可以是对象的属性。</p>
</div>

<script>
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
  $scope.cars = {
    car01 : {brand : "Ford", model : "Mustang", color : "red"},
    car02 : {brand : "Fiat", model : "500", color : "white"},
    car03 : {brand : "Volvo", model : "XC90", color : "black"}
  }
});
</script>
```


##### AngularJS 表格
ng-repeat 指令可以完美的显示表格。
``` html
<table>
  <tr ng-repeat="x in names">
    <td>{{ x.Name }}</td>
    <td>{{ x.Country }}</td>
  </tr>
</table>
```

##### 使用 uppercase 过滤器
使用 **uppercase** 过滤器转换为大写：
``` html
<table>
  <tr ng-repeat="x in names">
    <td>{{ x.Name }}</td>
    <td>{{ x.Country | uppercase }}</td>
  </tr>
</table>
```

###### 使用 CSS 样式
为了让页面更加美观，完美可以在页面中使用CSS：
``` html
<style>
  table, th, td {
    border: 1px solid grey;
    border-collapse: collapse;
    padding: 5px;
  }
  table tr:nth-child(odd) {
    background-color: #f1f1f1;
  }
  table tr:nth-child(even) {
    background-color: #fff;
  }
</style>
```

###### 显示序号($index)
表格显示序号可以在`<td>`中添加 **$index:**
``` html
<table>
  <tr ng-repeat="x in names">
    <td>{{ $index + 1 }}</td>
    <td>{{ x.Name }}</td>
    <td>{{ x.Country }}</td>
  </tr>
</table>
```

###### 使用 $even 和 $odd
``` html
<table>
  <tr ng-repeat="x in names">
    <td ng-if="$odd" style="background-color: #f1f1f1">{{ x.Name }}</td>
    <td ng-if="$even">{{ x.Name }}</td>
    <td ng-if="$odd" style="background-color: #f1f1f1">{{ x.Country }}</td>
    <td ng-if="$even">{{ x.Country }}</td>
  </tr>
</table>
```

##### AngularJS HTML DOM
AngularJS 为 HTML DOM 元素的属性提供了绑定应用数据的指令。

**ng-disabled 指令**
ng-disabled 指令直接绑定应用程序数据到 HTML 的 disabled 属性。
实例讲解：
**ng-disable** 指令绑定应用程序数据"mySwitch"到 HTML 的 disabled 属性。
**ng-model** 指令绑定 "mySwitch" 到 HTML input checkbox 元素的内容(value)。

##### ng-show 指令
**ng-show** 指令隐藏或显示一个 HTML 元素。
``` html
<div ng-app="">
  <p ng-show="true">我是可见的</p>
  <p ng-show="false">我是不可见的</p>
</div>
```
ng-show 指令根据 value 的值来显示(隐藏)HTML元素。
你可以使用表达式来计算布尔值(true 或 false)

##### ng-hide 指令
**ng-hide** 指令用于隐藏或显示 HTML 元素。

##### AngularJS事件
AngularJS 有自己的 HTML 事件指令。

##### ng-click 指令
**ng-click** 指令定义了 AngularJS 点击事件。

##### 函数会影响到全局命名空间
JavaScript 中应避免使用全局函数，因为他们很容易被其他脚本文件覆盖。
AngularJS 模块让所有函数的作用域在该模块下，避免了该问题。

#### 什么时候载入库？
> 在我们的实例中，所有 AngularJS 库都在 HTML 文档的头部载入。

对于 HTML 应用程序，通常建议把所有的脚本都放置在`<body>` 元素的最底部。
这会提高网页加载速度，因为 HTML 加载不受制于脚本加载。
在我们的多个 AngularJS 实例中，你将看到 AngularJS 库是在文档的 `<head>` 区域被加载。
在我们的实例中， AngularJS 在 `<head>` 元素中被加载，因为对angular.module的调用只能在库加载完成后才能进行。

另一个解决方案是在 `<body>` 元素中加载 AngularJS 库，但是必须放置在你的 AngularJS 脚本面前。


#### AngularJS表单
> AngularJS 表单是输入控件的集合。

##### HTML 控件
以下 HTML input 元素被称为 HTML 控件：

- input 元素
- select 元素
- button 元素
- textarea 元素

##### HTML 表单
> HTML 表单通常与 HTML 控件同时存在。

``` html
<div ng-app="myApp" ng-controller="formCtrl">
  <form action="" novalidate>
    First Name:<br>
    <input type="text" ng-model="user.firstName"><br>
    Last Name:<br>
    <input type="text" ng-model="user.lastName">
    <br><br>
    <button ng-click="reset()">RESET</button>
  </form>
  <p>form = {{ user }}</p>
  <p>master = {{ master }}</p>
</div>

<script>
  var app = angular.module('myApp', []);
  app.controller('formCtrl', function($scope) {
    $scope.master = { firstName: "John", lastName: "Doe"};
    $scope.reset = function() {
      $scope.user = angular.copy($scope.master);
    };
    $scope.reset();
  });
</script>
```

> novalidate属性是在 HTML5 中新增的。禁用了使用浏览器的默认验证。

novalidate 属性在应用中不是必须的，但是你需要在 AngularJS 表单中使用，用于重写标准的 HTML5 验证。


#### AngularJS输入验证
> AngularJS 表单和控件可以验证输入的数据。

##### 输入验证
> AngularJS 表单和控件可以提供验证功能，并对用户输入的非法数据进行警告

**客户端的验证不能确保用户输入数据的安全，所以服务端的数据验证也是必须的。**

|属性|描述|
|:---|:---|
|$dirty|表单有填写记录|
|$valid|字段内容合法的|
|$invalid|字段内容时非法的|
|$pristine|表单没有填写记录|


##### AngularJS 全局 API
> AngularJS 全局 API 用于执行常见任务的 JavaScript 函数集合。

angular.lowercase() -- 转换字符串为小写
angular.uppercase() -- 转换字符串为大写
angular.isString() -- 判断给定的对象是否为字符串，如果是返回 true。
angular.isNumber() -- 判断给定的对象是否为数字，如果是返回 true。

``` javascript
$scope.x1 = "JOHN";
$scope.x2 = angular.isString($scope.x1); //true
$scope.x3 = angular.isNumber($scope.x1); //false
```


#### AngularJS Bootstrap
AngularJS 的首选样式表示 Twitter Bootstrap, Twitter Bootstrap 是目前最受欢迎的前端框架。

#### AngularJS 包含
> 使用 AngularJS，你可以使用 `ng-include` 指令来包含 `HTML` 内容：

``` html
<body ng-app="">
  <div ng-include="'runoob.html'"></div>
</body>
```

runoob.html 文件代码：
``` html
<h1>教程</h1>
<p>这是一个被包含的 HTML 页面，使用 ng-include 指令来实现！</p>
```

##### 包含AngularJS代码
`ng-include` 指令除了可以包含HTML文件，还可以包含AngularJS代码：
sites.html文件代码：
``` html
<table>
  <tr ng-repeat="x in names">
    <td>{{ x.Name }}</td>
    <td>{{ x.Url }}</td>
  </tr>
</table>
```
包含的文件“site.html”中有AngularJS代码，它将被正常执行：
``` html
<div ng-app="myApp" ng-controller="sitesCtrl">
  <div ng-include="'sites.html'"></div>
</div>
```

##### 跨域包含
默认情况下，ng-include指令不允许包含其他域名的文件。
如果你需要包含其他域名的文件，你需要设置域名访问的白名单：
``` html
<body ng-app="myApp">
  <div ng-include="'http://c.runoob.com/runoobtest/angular_include.php'"></div>
  <script>
    var app = angular.module('myApp',[]);
    app.config(function($sceDelegateProvider) {
      $sceDelegateProvider.resourceUrlWhitelist([
        'http://c.runoob.com/runoobtest/**'
      ]);
    });
  </script>
</body>
```
此外，你还需要设置服务端允许跨域访问：
angular_include.php文件代码：
``` php
<?php 
//允许所有域名可以访问
header('Access-Control-Allow-Origin:*');
echo '<b style="color:red">我是跨域的内容</b>';
?>
```


#### AngularJS动画
AngularJS 提供了动画效果，可以配合CSS使用。
AngularJS使用动画需要引入 angular-animate.min.js库。
`<script src="http://cdn.static.runoob.com/libs/angular.js/1.4.6/angular-animate.min.js"></script>`
还需在应用中使用模型 ngAnimate:
`<body ng-app="ngAnimate">`
如果我们的应用已经设置了应用名，可以把ngAnimate直接添加在模型中：
```
<body ng-app="myApp">
<h1>隐藏 DIV：<input type="checkbox" ng-model="myCheck"></h1>
<div ng-hide="myCheck"></div>
<script>
var app = angular.module('myApp',['ngAnimate']);
</script>
```

#### AngularJS依赖注入
##### 什么是依赖注入
wiki上的解释是：依赖注入(Dependency Injection，简称DI)是一种软件设计模式，在这种模式下，一个或更多的依赖(或服务)被注入(或者通过引用传递)到一个独立的对象(或客户端)中，然后成为了该客户端状态的一部分。
该模式分离了客户端依赖本身行为的创建，这使得程序设计变得松耦合，并遵循了依赖反转和单一职责原则。与服务定位器模式形成直接对比的是，它允许客户端了解客户端如何使用该系统找到依赖。
`一句话 --- 没事你不要来找我，有事我会去找你`

AngularJS 提供了很好的依赖注入机制。以下5个核心组件用来作为依赖注入：

- value
- factory
- service
- provider
- constant


**value**
Value 是一个简单的 JavaScript 对象，用于向控制器传递值(配置阶段)：
``` javascript
//定义一个模块
var mainApp = angular.module('mainApp',[]);
//创建value对象"defaultInput"，并设置它的值
mainApp.value("defaultInput", 5);
//将"defaultInput"注入到控制器
mainApp.controller('CalController',function($scope,CalcService,defaultInput){
  $scope.number = defaultInput;
  $scope.result = CalcService.square($scope.number);
  $scope.square = function() {
    $scope.result =CalcService.square($scope.number);
  }
});
```

**factory**
factory是一个函数用于返回值。在service和controller需要时创建。
通常我们使用factory函数来计算或返回值。
``` javascript
//定义一个模块
var mainApp = angular.module('mainApp', []);
//创建factory "MathService" 用于两数的乘积 provides a method multiply to return multiplication of two numbers
mainApp.factory('MathService', function() {
  var factory = {};
  factory.multiply = function(a, b) {
    return a * b;
  };
  return factory;
});
//在service中注入factory "MathService"
mainApp.service('CalcService', function(MathService) {
  this.square = function(a) {
    return MathService.multiply(a, a);
  }
});

```


