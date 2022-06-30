---
layout: post
title: "push to origin/master was rejected"
thumbnail: https://i.imgur.com/j8qgVtW.png
abstract: 用来解决push to origin/master was rejected错误
toc: true
tags: 
  - Git
categories:
  - 笔记
---

# push to origin/master was rejected错误解决方案
idea中，发布项目到gitee的Git中，当时按照这样的流程添加Git，然后push，提示：`push to origin/master war rejected`。
<!-- more -->

![pull](http://upload-images.jianshu.io/upload_images/11162615-da4502c6e827b3b2?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
## 解决方案如下：

1.切换到自己项目所在的目录，右键选择GIT BASH Here，Idea中可使用Alt+F12

2.在terminl窗口中依次输入命令：

```bash
git pull
git pull origin master
git pull origin master --allow-unrelated-histories
```

3.在idea中重新push自己的项目，成功！！！

[原文](https://blog.csdn.net/a137151062/article/details/78820806)
