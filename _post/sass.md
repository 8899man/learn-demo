关于sass compass browser-sync gulp的博客。。。
----

http://www.w3cplus.com/sassguide/syntax.html




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





