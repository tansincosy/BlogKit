---
layout: post
title: "为你博客添加disqus评论系统"
thumbnail: https://i.imgur.com/Xb6JR06.png
abstract: 基于 jekyll 博客，添加disqus系统
categories:
  - 笔记
tags: 
  - disqus
toc: true
---


## 前言
博客做了有一段时间了，写了一些文章；想想写了这些东西，关键没有人评论，总感觉是自己一个人在对着自己说话，始终空落落的。因此自己就得整个评论的。<br>
于是乎，到找找国内评论的，发现好多的都要关闭了；不知道是什么原因。<br>
<!-- more -->

因此自己搭了一个梯子去国外网站去看看。发现了一个新大陆[**disqus**](https://disqus.com/)
## 开始
1.任何网站都的从注册开始，这个网站也是这样的。
- 注册，如图(记得自己弄梯子)：
  ![5edycj.png](https://upload.cc/i1/2018/10/31/5edycj.png)
  ![Zo2j6E.png](https://upload.cc/i1/2018/10/31/Zo2j6E.png)
- 登录完成之后，他会显示一下页面，我们点击箭头所指方向
  ![8PblyB.png]( https://upload.cc/i1/2018/10/31/8PblyB.png)
- 进入之后，输入一些信息,然后点击 **create site**
  ![OgobK7.png](https://upload.cc/i1/2018/10/31/OgobK7.png)
- 它会询问你，一些服务资费，这里我们选择基础的，也就是免费。（当然土豪可以忽略）
  ![sU0gme.png](https://upload.cc/i1/2018/10/31/sU0gme.png)
- 由于我的博客是 **jekyll** 所以这里我选择 jekyll
  ![OeWyma.png](https://upload.cc/i1/2018/10/31/OeWyma.png)
- 我们配置一下 **disqus** 一些配置，然后点击 **complete Setup**
  ![MPhAF9.png](https://upload.cc/i1/2018/10/31/MPhAF9.png)
- 至此我们流程已经50%了，接下
  ![AFKhWw.png](https://upload.cc/i1/2018/10/31/AFKhWw.png)
- 我们选择下要配置的网页
  ![fIzxoc.png](https://upload.cc/i1/2018/10/31/fIzxoc.png)
- 最后我们就可以看到一个关键点 **shortname**,然后点击保存
  ![f8PpaD.png](https://upload.cc/i1/2018/10/31/f8PpaD.png)

2.上面的几步只是注册一些东西，我们接下来还要集成到我们自己博客中。
- 一般在你的博客的文章下方下方复制这段代码
  ```html
    <div id="disqus_thread"></div>
    <script>
    var disqus_config = function () {
        this.page.url = '{{ page.url | absolute_url }}';
        this.page.identifier = '{{ page.url | absolute_url }}';
    };
    (function () {
        var d = document, s = d.createElement('script');
        s.src = 'https://{{ page.url }}.disqus.com/embed.js";
        s.setAttribute('data-timestamp', +new Date());
        (d.head || d.body).appendChild(s);
     })();
    </script>
    <noscript>Please enable JavaScript to view the comments.</noscript>
  ```

## 最终效果
![ASYXa8.png](https://upload.cc/i1/2018/10/31/ASYXa8.png)
