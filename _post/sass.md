关于sass compass browser-sync gulp的博客。。。
----
sass博客的撰写参考
1.http://www.w3cplus.com/sassguide/compile.html

在sass的命令行中，我们一般常用的有`--style`，`--sourcemap`，`--debug-info`等

http://www.w3cplus.com/sassguide/syntax.html



○ sass 中多值变量
多值变量分为list类型和map类型，简单来说list类型有点像js中的数组，而map类型有点像js中的对象

list
list数据可以通过空格，逗号或者小括号分隔多个值，可用`nth($val,$index)`取值。关于list数据操作还有很多其他函数如`length($list)`，`join($list1,$list2,[$separator])`，`append($list,$value,[$separator])`等，具体可参考[sass Functions](http://sass-lang.com/documentation/Sass/Script/Functions.html)（搜索`List Functions`即可）
定义
```sass
//一维数据
$px: 5px 10px 20px 30px;

//二维数据，相当于js中的二维数组
$px: 5px 10px, 20px 30px;
$px: (5px 10px) (20px 30px);
```
使用
```sass
//sass style
//-------------------------------
$linkColor: #08c #333 !default;//第一个值为默认值，第二个鼠标滑过值
a{
  color:nth($linkColor,1);

  &:hover{
    color:nth($linkColor,2);
  }
}
```
生成
```css
//css style
//-------------------------------
a{
  color:#08c;
}
a:hover{
  color:#333;
}
```

map
map数据以key和value成对出现，其中value又可以是list。格式为：`$map:(key1:value1,key2:value2,key3:value3);`。可通过`map-get($map,$key)`取值。关于map数据还有很多其他函数如`map-merge($map1,$map2)`，`map-key($map)`，`map-values($map)`等，具体可参考[sass Functions](http://sass-lang.com/documentation/Sass/Script/Functions.html)（搜索Map Functions即可）
定义
```sass
$heading: (h1: 2em, h2: 1.5em, h3: 1.2em);
```
使用
```sass
//sass style
//-------------------------------
$headings: (h1: 2em, h2: 1.5em, h3: 1.2em);
@each $header, $size in $headings {
  #{$header} {
    font-size: $size;
  }
}
```
生成
```css
//css style
//-------------------------------
h1 {
  font-size: 2em; 
}
h2 {
  font-size: 1.5em; 
}
h3 {
  font-size: 1.2em; 
}
```



○ sass 中全局变量
在变量值后面加上`!global`即为全局变量。这个目前还用不上，不过将会在`sass 3.4`后的版本中正式应用。目前的`sass`变量范围饱受诟病，所以才有了这个全局变量。
##### 目前变量机制
在选择器中声明的变量会覆盖外面全局声明的变量。(这也就人们常说的sass没有局部变量)
```sass
//sass style
//-------------------------------
$fontSize:      12px;
body{
    $fontSize: 14px;        
    font-size:$fontSize;
}
p{
    font-size:$fontSize;
}
```
生成
```css
//css style
//-------------------------------
body{
    font-size:14px;
}
p{
    font-size:14px;
}
```

##### 启用global之后的机制
请注意，这个目前还无法使用，所以样式不是真实解析出来的。
```sass
//sass style
//-------------------------------
$fontSize:      12px;
$color:         #333;
body{
    $fontSize: 14px;        
    $color：   #fff !global;
    font-size:$fontSize;
    color:$color;
}
p{
    font-size:$fontSize;
    color:$color;
}
```
生成
```css
//css style
//-------------------------------
body{
    font-size:14px;
    color:#fff;
}
p{
    font-size:12px;
    color:#fff;
}
```
这里设置了两个变量，然后在body里面重新设置了下，有点不同的是对于$color变量，我们设置了!global。通过编译后的css可以看到font-size取值不同，而color取值相同。与上面的机制对比就会发现默认在选择器里面的变量为局部变量，而只有设置了!global之后才会成为全局变量。
关于变量的详细分析请查阅[sass揭秘之变量](http://www.w3cplus.com/preprocessor/sass-basic-variable.html)

### 嵌套（Nesting）
sass的嵌套包括两种：一种是选择器的嵌套；另一种是属性的嵌套。我们一般说起或用到的都是选择器的嵌套。

##### 选择器嵌套
所谓选择器嵌套指的是在一个选择器中嵌套另一个选择器来实现继承，从而增强了sass文件的结构性和可读性。
在选择器嵌套中，可以使用&表示父元素选择器
###### 这个就不写demo了。

##### 属性嵌套
所谓属性嵌套指的是有些属性拥有同一个开始单词，如border-width，border-color都是以border开头。拿个官网的实例看下：
```sass
//sass style
//-------------------------------
.fakeshadow {
  border: {
    style: solid;
    left: {
      width: 4px;
      color: #888;
    }
    right: {
      width: 2px;
      color: #ccc;
    }
  }
}
```
生成
```css
//css style
//-------------------------------
.fakeshadow {
  border-style: solid;
  border-left-width: 4px;
  border-left-color: #888;
  border-right-width: 2px;
  border-right-color: #ccc; 
}
```
当然，这只是一个例子用来描述属性嵌套，实际中，关于border的样式我们肯定不会这么去写。

### @at-root
sass3.3.0中新增的功能，用来跳出选择器嵌套的。默认所有的嵌套，继承所有上级选择器，但有了这个就可以跳出所有上级选择器。
##### 普通跳出嵌套

### 关于sass中注释中有中文编译就报错的解决：
在sass文件开头加上`@charset "UTF-8";`
```sass
//没有跳出
.parent-1 {
  color:#f00;
  .child {
    width:100px;
  }
}
//多个选择器跳出
.parent-3 {
  background:#f00;
  @at-root {
    .child1 {
      width:300px;
    }
    .child2 {
      width:400px;
    }
  }
}
```

`@at-root(without:...)和@at-root(with:...)`
默认@at-root只会跳出选择器嵌套，而不能跳出@media或@support，如果要跳出这两种，则需使用@at-root (without: media)，@at-root (without: support)。这个语法的关键词有四个：all（表示所有），rule（表示常规css），media（表示media），support（表示support，因为@support目前还无法广泛使用，所以在此不表）。我们默认的@at-root其实就是@at-root (without:rule)。
```sass
//sass style
//-------------------------------
//跳出父级元素嵌套
@media print {
    .parent1{
      color:#f00;
      @at-root .child1 {
        width:200px;
      }
    }
}

//跳出media嵌套，父级有效
@media print {
  .parent2{
    color:#f00;

    @at-root (without: media) {
      .child2 {
        width:200px;
      } 
    }
  }
}

//跳出media和父级
@media print {
  .parent3{
    color:#f00;

    @at-root (without: all) {
      .child3 {
        width:200px;
      } 
    }
  }
}
```
生成
```css
//-------------------------------
@media print {
  .parent1 {
    color: #f00;
  }
  .child1 {
    width: 200px;
  }
}

@media print {
  .parent2 {
    color: #f00;
  }
}
.parent2 .child2 {
  width: 200px;
}

@media print {
  .parent3 {
    color: #f00;
  }
}
.child3 {
  width: 200px;
}
```

##### @at-root与&配合使用
```sass
//sass style
//-------------------------------
.child{
    @at-root .parent &{
        color:#f00;
    }
}
```
生成
```css
//css style
//-------------------------------
.parent .child {
  color: #f00;
}
```
##### 应用于@keyframe
如果说要体现sass的优势，我想这个最能体现了。
相比于之前在css中使用@keyframe来定义动画，然后在元素中调用，如果一个文件中@keyframe比较多的话，在我们想要调用动画的时候，动画与元素之间的关联性比较差。
我们结合@at-root的话，就会带来不一样的效果。
```sass
//sass style
//-------------------------------
.demo {
    ...
    animation: motion 3s infinite;

    @at-root {
        @keyframes motion {
          ...
        }
    }
}
```
每一个元素的动画样式都可以写在里面
生成
```sass
//-------------------------------   
.demo {
    ...   
    animation: motion 3s infinite;
}
@keyframes motion {
    ...
}
```

### 混合(mixin)
sass中使用@mixin声明混合，可以传递参数，参数名以$符号开始，多个参数以逗号分开，也可以给参数设置默认值。声明的@mixin通过@include来调用。
###### 无参数minxin
```sass
//sass style
//-------------------------------
@mixin center-block {
    margin-left:auto;
    margin-right:auto;
}
.demo{
    @include center-block;
}

//css style
//-------------------------------
.demo{
    margin-left:auto;
    margin-right:auto;
}
```

###### 有参数mixin
```sass
//sass style
//-------------------------------   
@mixin opacity($opacity:50) {
  opacity: $opacity / 100;
  filter: alpha(opacity=$opacity);
}

//css style
//-------------------------------
.opacity{
  @include opacity; //参数使用默认值
}
.opacity-80{
  @include opacity(80); //传递参数
}
```
###### 多个参数mixin
调用时可直接传入值，如@include传入参数的个数小于@mixin定义参数的个数，则按照顺序表示，后面不足的使用默认值，如不足的没有默认值则报错。除此之外还可以选择性的传入参数，使用参数名与值同时传入。
```
//sass style
//-------------------------------   
@mixin horizontal-line($border:1px dashed #ccc, $padding:10px){
    border-bottom:$border;
    padding-top:$padding;
    padding-bottom:$padding;  
}
.imgtext-h li{
    @include horizontal-line(1px solid #ccc);
}
.imgtext-h--product li{
    @include horizontal-line($padding:15px);
}

//css style
//-------------------------------
.imgtext-h li {
    border-bottom: 1px solid #cccccc;
    padding-top: 10px;
    padding-bottom: 10px;
}
.imgtext-h--product li {
    border-bottom: 1px dashed #cccccc;
    padding-top: 15px;
    padding-bottom: 15px;
}
```

###### 多组值参数mixin
如果一个参数可以有多组值，如box-shadow、transition等，那么参数则需要在变量后加三个点表示，如$variables...。
```sass
//sass style
//-------------------------------   
//box-shadow可以有多组值，所以在变量参数后面添加...
@mixin box-shadow($shadow...) {
  -webkit-box-shadow:$shadow;
  box-shadow:$shadow;
}
.box{
  border:1px solid #ccc;
  @include box-shadow(0 2px 2px rgba(0,0,0,.3),0 3px 3px rgba(0,0,0,.3),0 4px 4px rgba(0,0,0,.3));
}

//css style
//-------------------------------
.box{
  border:1px solid #ccc;
  -webkit-box-shadow:0 2px 2px rgba(0,0,0,.3),0 3px 3px rgba(0,0,0,.3),0 4px 4px rgba(0,0,0,.3);
  box-shadow:0 2px 2px rgba(0,0,0,.3),0 3px 3px rgba(0,0,0,.3),0 4px 4px rgba(0,0,0,.3);
}
```


###### @content
@content在sass3.2.0中引入，可以用来解决css3的@media等带来的问题。它可以使@mixin接受一整块样式，接受的样式从@content开始。
ps:@mixin通过@include调用后解析出来的样式是以拷贝形式存在的，而下面的继承则是以联合声明的方式存在的，所以从3.2.0版本以后，建议传递参数的用@mixin，而非传递参数类的使用下面的继承%。


###### 继承@extend
sass中，选择器继承可以让选择器继承另一个选择器的所有样式，并联合声明。使用选择器的继承，要使用关键词@extend，后面紧跟需要继承的选择器。
```sass
//sass style
//-------------------------------
h1{
  border: 4px solid #ff9aa9;
}
.speaker{
  @extend h1;
  border-width: 2px;
}

//css style
//-------------------------------
h1,.speaker{
  border: 4px solid #ff9aa9;
}
.speaker{
  border-width: 2px;
}
```

###### 占位选择器%
从sass 3.2.0以后就可以定义占位选择器%。这种选择器的优势在于：如果不调用则不会有任何多余的css文件，避免了以前在一些基础的文件中预定义了很多基础的样式，然后实际应用中不管是否使用了@extend去继承相应的样式，都会解析出来所有的样式。占位选择器以%标识定义，通过@extend调用。

如上代码，定义了两个占位选择器%ir和%clearfix，其中%clearfix这个没有调用，所以解析出来的css样式也就没有clearfix部分。占位选择器的出现，使css文件更加简练可控，没有多余。所以可以用其定义一些基础的样式文件，然后根据需要调用产生相应的css。
ps：在@media中暂时不能@extend @media外的代码片段，以后将会可以。

###### 函数
sass定义了很多函数可供使用，当然你也可以自己定义函数，以@fuction开始。sass的官方函数链接为：[sass Function](http://sass-lang.com/documentation/Sass/Script/Functions.html)，实际项目中我们使用最多的应该是颜色函数，而颜色函数中又以lighten减淡和darken加深为最，其调用方法为lighten($color,$amount)和darken($color,$amount)，它们的第一个参数都是颜色值，第二个参数都是百分比。
```sass
$baseFontSize: 10px !default;
$gray: #ccc !default;

@function pxToRem($px) {
    @return $px / $baseFontSize * 1rem;
}
body {
    font-size: $baseFontSize;
    color: lighten($gray,10%);
}
.test {
    font-size:pxToRem(16px);
    color:darken($gray,10%);
}
```

###### 运算
sass具有运算的特性，可以对数值型的Value(如：数字、颜色、变量等)进行加减乘除四则运算。请注意运算符前后请留一个空格，不然会出错。

##### 条件判断及循环
###### @if判断
@if可一个条件单独使用，也可以和@else结合多条件使用
```sass
$lte7: true;
$type: monster;
.ib {
    display:inline-block;
    @if $lte7 {
        *display:inline;
        *zoom:1;
    }
}
p {
    @if $type == ocean {
        color: blue;
    } @else if $type == matador {
        color: red;
    } @else if $type == monster {
        color: green;
    } @else {
        color: black;
    }
}
```

##### 三目判断
语法为：if($condition, $if_true, $if_false) 。三个参数分别表示：条件，条件为真的值，条件为假的值。
```sass
if(true, 1px, 2px) => 1px
if(false, 1px, 2px) => 2px
```

##### for循环
for循环有两种形式，分别为：`@for $var from <start> through <end>`和`@for $var from <start> to <end>`。$i表示变量，start表示起始值，end表示结束值，这两个的区别是关键字through表示包括end这个数，而to则不包括end这个数。
```sass
@for $i from 1 through 3 {
    .item-#{$i} {
        width: 2em * $i;
    }
}
```
生成
```
.item-1 {
  width: 2em;
}

.item-2 {
  width: 4em;
}

.item-3 {
  width: 6em;
}
```


##### @each循环
语法为：`@each $var in <list or map>`。其中$var表示变量，而list和map表示list类型数据和map类型数据。sass 3.3.0新加入了多字段循环和map数据循环。
###### 单个字段list数据循环
```sass
$animal-list: puma,sea-slug,egret,salamander;
@each $animal in $animal-list {
    .#{$animal}-icon {
        background-image: url('/images/#{$animal}.png');
    }
}
```
生成
```
.puma-icon {
  background-image: url("/images/puma.png");
}

.sea-slug-icon {
  background-image: url("/images/sea-slug.png");
}

.egret-icon {
  background-image: url("/images/egret.png");
}

.salamander-icon {
  background-image: url("/images/salamander.png");
}
```
###### 多个字段list数据循环
```sass
//sass style
//-------------------------------
$animal-data: (puma, black, default),(sea-slug, blue, pointer),(egret, white, move);
@each $animal, $color, $cursor in $animal-data {
  .#{$animal}-icon {
    background-image: url('/images/#{$animal}.png');
    border: 2px solid $color;
    cursor: $cursor;
  }
}

//css style
//-------------------------------
.puma-icon {
  background-image: url('/images/puma.png');
  border: 2px solid black;
  cursor: default; 
}
.sea-slug-icon {
  background-image: url('/images/sea-slug.png');
  border: 2px solid blue;
  cursor: pointer; 
}
.egret-icon {
  background-image: url('/images/egret.png');
  border: 2px solid white;
  cursor: move; 
}
```

###### 多个字段map数据循环
```sass
//sass style
//-------------------------------
$headings: (h1: 2em, h2: 1.5em, h3: 1.2em);
@each $header, $size in $headings {
  #{$header} {
    font-size: $size;
  }
}

//css style
//-------------------------------
h1 {
  font-size: 2em; 
}
h2 {
  font-size: 1.5em; 
}
h3 {
  font-size: 1.2em; 
}
```


