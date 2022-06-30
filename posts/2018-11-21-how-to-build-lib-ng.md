---
title: 如何为你的 angular app构建一个第三方库
tags: angular
thumbnail: 'https://i.imgur.com/FgnSK76.jpg'
toc: true
categories:
  - 笔记
date: 2018-11-21 00:10:03
---

> 完整指南

Angular 团队 在 angular6 中，使得创建 Angular 第三方库变得更为简单。如果你以前尝试过操作，你会发现其实不是很简单！
<!-- more -->
那么流程是什么呢？

首页我们构建一个搭建一个简单的环境，环境里面包含一些组件和服务以及一些接口。

# 创建项目
1.按照官方教程，使用`ng new `命令初始化项目：
```bash
ng new lib-demo --prefix ld
```

在 **angular-cli **第6个之后版本。配置文件的方式发生了相当大变化，`angular.json`现在代表**angular**工作空间,![Imgur](https://i.imgur.com/hqrxvJO.png)

> 你可以可以使用`ng generate application [my-app-name]`命令添加更多项目

你也可以通过 **ng generate**指令创建一个公共库。

```bash
ng generate library tvmaze --prefix tm
```

当然你可以使用简写命令

```bash
ng g lib tvmaze --prefix tm
```

具体参照

[参数]: https://github.com/angular/angular-cli/wiki/generate-library

使用`generate`在我们**angular.json**中添加一个项目。

![Imgur](https://i.imgur.com/TqAopvf.png)

# 在库中创建一个服务

我们会发现tvmaze有它自己的`package.json`，`tsconfig.json`，`tslint.json`和`karma.conf.js`，这样建立是有原因的，因为这个项目独立与主应用建立而成，它本身也有组件、服务、模块。稍后我们添加其他的内容。现在我们添加一些逻辑：![Imgur](https://i.imgur.com/QpW7PHy.png)

> 这里说明下`provideIn: root`是**angular6** 之后的新属性，详情见官网；如果是为了打包优化。

# 在库中创建一个组件

我们使用**angular-cli** 来创建一个组件

```bash
# 使用--project 指定创建在那个工程中
ng generate component poster --project=tvmaze
```

然后这样编辑![Imgur](https://i.imgur.com/2nT8EYz.png)

将组件注册到`TvmazeModule`中，并且**exports**中是的外部能够访问，还得添加 `CommonModule`,`HttpClientModule`两个模块。![Imgur](https://i.imgur.com/8Gtz41h.png)

# 构建一下

在我们使用之前，我们先构建一下，我们`ng build`构建，指定项目。

```bash
ng build tvmaze
```

# 使用库

接下来，我们来使用刚刚构建好的库，一般我们采用第三方库都是使用`import`来导入。

![Imgur](https://i.imgur.com/AEa13g3.png)

> 我们会发现库不存在。因为这种方式，它是从**node_modules**寻找，所以我们要在根目录下`tsconfig.json`添加**paths**

![Imgur](https://i.imgur.com/MIsVVk7.png)

接下来我们在主项目中运用：使用`<tm-poster>`标签，即可完成

![Imgur](https://i.imgur.com/iLG73gQ.png)

# 发布到npm中去

我们直接使用以下命令：前提是你注册npm账号

```bash
ng build tvmaze
cd dist / tvmaze 
npm publish
```

