---
layout: post
title: "python 学习(一)"
thumbnail: https://i.imgur.com/JjIQyzR.png
abstract: 介绍python基础，核心知识：数字和字符串
toc: true
tags:
  - PYTHON
categories:
  - 学习
---


# 基础知识

## 数字
<!-- more -->

- 加减乘除，以及圆括号运算
     ```python     
        print(2+4)
        print(2*4)
        # 2的4次幂
        print(2**4)
        # 结果浮点
        print(4/2)
        # 余数
        print(4%3)
        # 结果取整
        print(4//3)
     ```

- 二进制，八进制，十六进制

     > 表示三个进制数，必须以0开头，然后分别跟着不同进制的字母。`b`二进制，`o`是八进制，`x`十六进制。

     ```python
      #例如：
       '''0      b         11
          以0开头 表示进制  表示当前进制数字
       '''
       # 表示二进制
       print(0b11)
       # 表示八进制
       print(0o56)
       # 表示十六进制
     ```

- 二进制、八进制、十六进制相互转换

  ```python
  print('十进制---->二进制', bin(12345)) 
  #----> 十进制---->二进制 0b11000000111001
  
  print('十进制---->十六进制', hex(12345))
  #----> 十进制---->十六进制 0x3039
  
  print('十进制---->八进制', oct(12345))
  #----> 十进制---->八进制 0o30071
  
  print('八进制---->二进制', bin(0o30071))
  #---->  八进制---->二进制 0b11000000111001
  # 所有转换都类似
  ```

- 数字格式化输出（format 函数）

  > `format(x,y)`: x表示要格式的数字，y：表示格式字符串

  ```python
  #例如
  x = 12341234.56789
  # 小数点保留后两位
  print(format(x, '0.2f'))
  # 数字在12个字符区域内右对齐，并保留小数点后一位数字
  print(format(x, '>12.1f'))
  # 数字在12个字符区域内左对齐，并保留小数点后三位数字
  print(format(x, '<12.3f'))
  # 每个千位，添加一个，
  print(format(x, ','))
  # 每个千位，添加一个，保留三位
  print(format(x, ',.3f'))
  # 科学计数法
  print(format(x, 'e'))
  # 科学计数法,保留2位
  print(format(x, '0.2e'))
  
  # 最终结果是：
  '''
  12341234.57
    12341234.6
  12341234.568
  12,341,234.56789
  12,341,234.568
  1.234123e+07
  1.23e+07
  '''
  ```

- 输入`input`函数

     ```python
     name = input("请输入名字")
     age = int(input("请输入年龄"))
     salary = float(input("请输入收入"))
     
     print(name, "姓名")
     print(age, "年龄")
     print(salary, "收入")
     
     '''
     请输入名字1
     请输入年龄3
     请输入收入4
     
     1 姓名
     3 年龄
     4.0 收入
     '''
     ```

- 注释

    - 分为：

      单行注释`#`

      多行注释`''''''`(单引号或者是双引号)

    - 有时候我们需要确认文件的保存格式，可以采用单行注释来说明：

      ```python
      # coding=utf-8   使用utf-8格式进行保存文件
      ```

    - 单行注释和多行注释的用法

      ```python
      # 科学计数法         单行注释
      
      
      '''                 多行注释
      请输入名字1
      请输入年龄3
      请输入收入4
      
      1 姓名
      3 年龄
      4.0 收入
      '''
      ```

## 字符串

> 在python世界里，`''`和`""`都可以用来表示字符串，和JavaScript一样。没有区别，只是习惯问题。

- `''`和`""`没有区别

  ```python
  print("hello world")
  print('hello world')
  print('this\'s is my world')
  ```

- 字符串拼接`+`

  ```python
  x='hello'
  y='world'
  print(x+y)
  ```

- 对于`\`转义，和其他语言相似。具体可以参照javascript

- 长字符串`''' '''`

  ```python
  print('''
  'love'
  "python"
  ''')
  
  '''
  输出，我们可以理解为js 中es6语法的``字符串
  'love'
  "python"
  '''
  ```
