---
title: 使用 Service worker 实现加速/离线访问静态 blog 网站
date: 2016-04-15 23:31:09
---

# Service worker
有一个困扰 web 用户多年的难题——丢失网络连接。即使是世界上最好的 web app，如果下载不了它，也是非常糟糕的体验。如今虽然已经有很多种技术去尝试着解决这一问题。而随着**离线页面**的出现，一些问题已经得到了解决。但是，最重要的问题是，仍然没有一个好的统筹机制对资源缓存和自定义的网络请求进行控制。

于是 HTML5 提出了 Service Worker，Service worker 提供了很多新的能力，使得 web app 拥有与 nativeapp 相同的离线体验、消息推送体验。
Service worker 是一段脚本，与 web worker 一样，也是在后台运行。作为一个独立的线程，运行环境与普通脚本不同，所以不能直接参与 web 交互行为。native app 可以做到离线使用、消息推送、后台自动更新，service worker 的出现是正是为了使得 web app 也可以具有类似的能力。

# 为什么要使用 Service worker
现在很流行基于 GitHub page 和 markdown 的静态 blog ，非常适合技术的思维和习惯，针对不同的语言都有一些优秀的静态 blog 系统出现，如 Jekyll/Ruby，Pelican/Python，Hexo/NodeJs ，由于静态内容的特性非常适合做缓存来加速页面的访问，就利用 Service worker 来实现加速，结果是除了 PageSpeed，CDN 这些常见的服务器和网络加速之外，通过客户端实现了更好的访问体验。

# 如何使用 Service worker
在使用 Service worker 之前，有必要了解一些 Service worker 的运行原理和基本架构。



chrome://serviceworker-internals/
现在你可以到 chrome://inspect/#service-workers 这里，检查 service worker 是否对你的网站启用了。 

service-worker.js 文件，我建议是放在网站的跟目录下。

service worker.js 文件被放在这个域的根目录下，这意味着 service worker是跟网站同源的。换句话说，这个 service worker 将会获取到这个域下的所有 fetch 事件。如果 service worker文件注册到/example/sw.js ，那么 service worker 只能收到 /example/ 路径下的 fetch 事件（比如： /example/page1/, /example/page2/）。



我们来看这个 fetch 方法
```
caches.match(event.request).then(function(res){ // 判断缓存是否命中
  if(res){  // 返回缓存中的资源
    return res;
  }
  requestBackend(event); // 执行请求备份操作
})
```
如果命中了缓存中的文件，则返回我们缓存的文件，也就是说，直接使用我们缓存中的资源文件，不用去网上下载文件。
如果没有命中缓存中的文件，也就是说，我们缓存中没有这个文件，那么，就调用 requestBackend() 方法，这个方法会执行去线上下载资源文件的操作。
那么，很明显，service-worker 能带来的效果就如我标题所说的：**加速** 或者 **离线** 访问。

service worker 中的 scope 可以修改吗？
修改为外名的资源可以吗？




第三篇文章介绍[service-worker后门用法](https://segmentfault.com/a/1190000005954040)