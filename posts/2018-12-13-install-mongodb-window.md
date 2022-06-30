---
title: window 操作系统，安装 mongodb.zip 包
tags:
  - mongodb
thumbnail: 'https://i.imgur.com/hKisSVx.jpg'
toc: true
categories:
  - 笔记
date: 2018-12-13 22:06:05
abstract:
---


安装**mongodb.msc**文件时，最后一步总是报错，告诉你服务安装失败。于是下载了**mongodb** ZIP包；也就是绿色版本，进行安装！

<!--more-->

## 下载

1. [下载链接](http://dl.mongodb.org/dl/win32/x86_64)

![Imgur](https://i.imgur.com/JkWupti.png)

​        参照自己的**window**版本，下载对应的 zip 包。

2. 观察下载目录是不是这样的？

   ![Imgur](https://i.imgur.com/xDcmjn7.png)

## 创建目录

1. 在自己磁盘中创建一个文件名字随便起，文件中创建三个文件夹分别为：`data`,`etc`,`logs`，结合上个，完整目录为：

   ```yaml
   mongodb #主文件夹
         data #用来存在数据库
         etc  #用来存储配置文件
         logs #存在mongodb 日志文件
         bin # mongodb的执行文件
         LICENSE-Community.text
         MPL-2
         README
         THIRD-PARTY-NOTICES
   ```

2. 写一个配置文件**mongo.conf**，在文件中添加内容：

   ```
   dbpath=D:\mongodb\data #数据库路径  
   logpath=D:\mongodb\logs\mongo.log #日志输出文件路径  
   logappend=true #错误日志采用追加模式  
   journal=true #启用日志文件，默认启用  
   quiet=true #这个选项可以过滤掉一些无用的日志信息，若需要调试使用请设置为false  
   port=27017 #端口号 默认为27017
   ```

   > 注意：**dbpath**和**logpath**。这个是根据你的文件夹路径写的

​      最终结果如下：

​     ![Imgur](https://i.imgur.com/TtRlRzG.png)

## 启动

1. 为了能够全局使用**mongodb**一些命令，我们配置**path**环境。

   ![Imgur](https://i.imgur.com/95eqQrM.png)

   ![Imgur](https://i.imgur.com/Dcme5vq.png)

   2. 添加mongodb 服务

      ```bash
      mongod --dbpath "D:\mongodb\data\db" --logpath "D:\mongodb\logs\MongoDB.log" --install --serviceName "MongoDB"
      ```

   3. 启动服务

      ```bash
      net start MongoDB
      ```

   4. 在浏览器中输入`http://127.0.0.1:27017/`，如果有以下显示说明启动成功！

      ![Imgur](https://i.imgur.com/39Qzu93.png)

   5. 启动**mongodb**

   ​      ![Imgur](https://i.imgur.com/woFSyhg.png)

## 最后

自己开始弄**mongodb**，数据操作。
