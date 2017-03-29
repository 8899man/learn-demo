title: HTML5新增

# XHR2
HTML5 中提供的 XMLHTTPREQUEST Level 2 (及XHR2) 已经实现了跨域访问。但 IE 10 以下不支持

只需要在服务端填上响应头：
``` 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
```

# CORS 跨域资源共享
CORS 允许一个域上的网络应用向另一个域提交跨域 AJAX 请求。启用此功能非常简单，只需由服务器发送一个响应标头即可。

# blob

# formdata



