
# 应对不支持 JavaScript 的浏览器
``` html
<img class="lazy" src="img/placehold.png" data-original="img/example.png" width="600" height="300">
<noscript>
  <img src="img/example.png" width="600" height="300">
</noscript>
```

那么，刚开始的时候，我们将需要延迟加载的图片区域隐藏起来。
``` css
.lazy {
    display: none;
}
```

针对支持 JavaScript 的浏览器，我们在 document loads 的时候，将图片展示区域显示出来，然后调用 lazyload() 。
``` javascript
$('img.lazy').show().lazyload();
```


