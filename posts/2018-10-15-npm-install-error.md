---
layout: post
title: "npm 安装依赖失败"
thumbnail: https://i.imgur.com/PGBVhbD.png
abstract: 解决npm源，以及node-sass无法下载等系列问题
toc: true
tags:
  - npm
categories:
  - 笔记
---

# 前言
- 有时候，我们通过`npm install`进行项目初始化，会由于“天朝墙”的原因，可能会导致下载速度慢，无法下载等等问题出现。
<!-- more -->

好在现在有很多国内镜像，也有一个帮助我们随意切换 npm 镜像的工具：nrm。

```bash
npm install -g nrm
nrm ls

* npm ---- https://registry.npmjs.org/
  cnpm --- http://r.cnpmjs.org/
  taobao - https://registry.npm.taobao.org/
  nj ----- https://registry.nodejitsu.com/
  rednpm - http://registry.mirror.cqupt.edu.cn/
  npmMirror  https://skimdb.npmjs.com/registry/
  edunpm - http://registry.enpmjs.org/
  
nrm use taobao
```
- 现在我们将镜像切换成了淘宝：

 ```bash
  npm ---- https://registry.npmjs.org/
  cnpm --- http://r.cnpmjs.org/
* taobao - https://registry.npm.taobao.org/
  nj ----- https://registry.nodejitsu.com/
  rednpm - http://registry.mirror.cqupt.edu.cn/
  npmMirror  https://skimdb.npmjs.com/registry/
  edunpm - http://registry.enpmjs.org/
 ```
 - 但是有个弊端，当项目被其他人克隆后，每个人都要进行nrm，有点麻烦，可以在根目录创建添加 `.npmrc` 文件：
  
 ```bash
 sass_binary_site=https://npm.taobao.org/mirrors/node-sass/
phantomjs_cdnurl=https://npm.taobao.org/mirrors/phantomjs/
electron_mirror=https://npm.taobao.org/mirrors/electron/
registry=https://registry.npm.taobao.org
 ```
 - 直接进行` npm install` 时，npm 都会根据跟目录下 .npmrc 中的配置进行依赖的安装。

