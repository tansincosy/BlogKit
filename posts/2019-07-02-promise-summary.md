---
title: promise 冷知识
tags:
  - javascript
  - promise
thumbnail: https://i.imgur.com/BUxRT67.jpg
toc: true
categories:
  - 笔记
date: 2019-07-02 23:28:59
abstract:
---


### promise 总结

- promise 属于宏任务

<!-- more -->

- promise 构造函数是同步，而 then 是异步的

  ```javascript
  console.log('a')
  new Promise(() => {
    console.log('b')
  })
  console.log('c')
  // 执行结果是a,b,c
  ```

- promise 状态不可逆

- `then|catch|return`出去的数值会被后面的**then**或者**catch**接受（我们可以利用此特性，来进行链式调用）

- promise 无论返回什么，都会被封装的成 **promise** 对象，即使返回一个对象

- 使用then 进行接收，如果里面不是函数，会发生穿透

- promise 对象中的resolve或者reject 一个**promise**对象，那么前一个promise 会影响后面一个promise

### es7 的async

1. async 函数会返回一个promise函数
2. return 错误会让返回promise对象变为reject
3. 一般来说 **await** 后面的值是一个promise
4. 内部如果**await** 多个**promise**，则会等待所有**promise**执行完成才会执行**then** 