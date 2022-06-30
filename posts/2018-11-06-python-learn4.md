---
title: python 学习(四)
tags:
  - PYTHON
categories:
  - 学习
thumbnail: 'https://i.imgur.com/JjIQyzR.png'
date: 2018-11-06 23:40:33
toc: true
---


> 所有序列操作对于字符串是同样适用，我们可以理解为将字符串里面的字符看成是序列的一个一个的元素。
<!-- more -->
# 格式化字符串
字符串中最核心的功能就是格式化操作。
## 字符串格式化基础
- 字符串格式话相当于字符串模板。通俗的讲就是，字符串中一段是固定而另一端是动态变化的。
- 那么固定的模块，我们称之为模板；动态的可以用`%`来替换。

  例如：
  ```python
  formatStr = 'hello %s.this is %s world'
  values = ('sisi', 'sisi')
  print(formatStr % values)

  >>>hello sisi.this is dasdad world
  ```
  >字符串模板指定格式化参数时，要使用`%`,指定字符串格式化参数值要使用元组。

- 使用`%f`来表示浮点类型的格式化参数
  ```python
    # 定义格式化模板
    from math import pi

    formatStr = 'PI是圆周率，%.4f ----->保留小数点%d位'
    values = (pi, 4)

    print(formatStr % values)
    >>> PI是圆周率，3.1416 ----->保留小数点4位

    formatStr1 = '%s的成功率%d%%'
    values1 = ('思思', 100)
    print(formatStr1 % values1)
    >>> 思思的成功率100%

    values2 = ('思思')
    print(formatStr1 % values2)

    >>> 参数值的数量要和格式化参数不匹配，error
  ```
  >记得参数值的数量要和格式化参数要匹配，不然会报错

## 模板字符串
>在**String**模块中提供了一个用于格式化的字符串**template**的类，用来处理同一个值替换所有的相同格式化参数。

- **template**格式化参数，用**$**符号来开头，后面接着格式化名称。
  ```python
  from string import Template

  a = Template('$ccc是我最喜欢的$ccc还是$ccc')
  print(a.substitute(ccc="python"))

  >>> python是我最喜欢的python还是python
  ```
- 当格式化参数是一个字符串一部分时，需要用`{}`来区分。
  ```python
  b = Template('${abv}RING')
  print(b.substitute(abv='sub'))
  >>> subRING
  ```

## 字符串中`format`方法
- 使用一对`{}`,而且支持按顺序指定格式化参数值和关键字格式化参数
  ```python
  print("{} {} {}".format(1, 2, 3))
  >>> 1 2 3
  ```

- 可以命名格式化，可以在一对大括号中指定一个名称

  ```python
  print("{a} {b} {c}".format(a=1, b=2, c=3))
  >>> 1 2 3
  ```

- 混合顺序格式化参数和关键字格式化参数两种

  ```python
  a3 = "today is {week},{}, the{} temperature is {degree} degrees"
  # 这个方式是错的
  a3.format(week="31231", "dasdas", 1231231, degree="dadsa")
  # 前面应该是按照书讯传递格式化参数值，后面是关键字格式化参数值，顺序是不能调换
  print(a3.format("dadasa", 1231312, week="sunday", degree=22))
  >>> today is sunday,dadasa, the 1231312 temperature is 22 degrees
  ```

- 为顺序格式化参数指定了从format方法获取参数值的顺序，`{1}`表示从 format 方法的第2个参数取值`{0}`表示从 format 方法的第1个参数取值

  ```python
  a4 = "today is {week},{1}, the {0} temperature is {degree} degrees"
  print(a4.format("dadasa", 1231312, week="sunday", degree=22))
  >>> today is sunday,1231312, the dadasa temperature is 22 degrees
  ```

- 列表格式化

  ```python
  fullname = ["bill", "gates"]
  # 
  print("Mr {name[0]}".format(name=fullname))
  >>>Mr bill
  ```

- 导入math模块,访问 math 模块中的`__name__`变量来获取模块的名字，访问 math中的PI的变量获取PI的值

  ```python
  s5 = "the {mod.__name__} module defines the value {mod.pi} for pi"
  print(s5.format(mod=math))
  >>>the math module defines the value 3.141592653589793 for pi
  ```

- 更进异步的控制字符串格式化参数

    ```python
    print("{first!s}   {first!r}  {first!a}".format(first="中文"))
    >>>中文   '中文'  '\u4e2d\u6587'
    
    a6 = "{number1:E}"
    print(a6.format(number1=1234567789))
    >>>1.234568E+09
    ```

| 类型符 |                             描述                             |
| :----: | :----------------------------------------------------------: |
|   a    |                  将字符串按Unicode编码输出                   |
|   b    |                将一个整数格式化为一个二进制书                |
|   c    |                    将一个整数解释称ASCII                     |
|   d    |                   将整数格式化十进制的整数                   |
|   e    |              将十进制格式化科学计数法，用e表示               |
|   E    |              将十进制格式化科学计数法，用E表示               |
|   f    | 将十进制格式化格式化浮点数。会将特殊值（nan和inf）转换为小写 |
|   F    | 将十进制格式化格式化浮点数。会将特殊值（nan和inf）转换为大写 |
|   g    | 会根据整数值的位数，在浮点数和科学计数法之间，在整数为超过6位时，与e相同否则相同 |
|   E    | 会根据整数值的位数，在浮点数和科学计数法之间，在整数为超过6位时，与E相同否则相同 |
|   o    |                   将一个整数格式化为八进制                   |
|   s    |                         按照原样输出                         |
|   x    |             将一个整数格式化为十六进制，字母小写             |
|   X    |             将一个整数格式化为十六进制，字母大写             |
|   %    |                   将数值格式化为百分比形式                   |

其中**inf** 表示无穷大，**NAN**可解释为非数字。

## 字段宽度，精度和千位分隔符

```python
#显示宽度为12，会在52的左侧会有10空格
print("{num:12}".format(num="52"))
>>>          52
#52右侧显示6个字符
print("{num1:12}Grate".format(num1="52"))
>>>52          Grate
#保留pi的小数点后面两位
print("float number:{pi:.2f}".format(pi=pi))
>>>float number:3.14
#将精度应用与字符串，截取前五位字符
print("{:.5}".format("hello world"))
>>>hello
#用千分位分隔符输出googol
print("one googol is {:,}".format(10 ** 1000))
>>>one googol is 10,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000...
```

# 字符串方法

常用的字符串方法有 `center find join split lower upper capwords replace` 等

- center方法

  > 将字符串进行居中，center方法有两个参数。第一个参数是数字类型，表示字符串显示的宽度，第二可选的，用来添加填充的符号

    ```python
    print("<" + "hello".center(30) + ">")
    print("<{:^30}>".format("hello"))
    >>> <            hello             >
    print("<" + "hello".center(30, "&") + ">")
    print("<{:&^30}>".format("hello"))
    >>> <&&&&&&&&&&&&hello&&&&&&&&&&&&&>
    ```

- find 方法

  ```python
  s = "hello world"
  print(s.find("w"))
  >>>6 #第一次出现的“w”的位置，如果没有找到放回-1
  
  s = "hello world"
  print(s.find("o", 5))
  >>> 7 #指定开始的查找的位置
  
  s = "hello world"
  print(s.find("l", 5, 9))
  >>> -1 #指定结束位置，第8个位置
  ```

- join操作方式和`js`操作方式相似（注意一点就是，序列元素必须是字符串类型）

- split 和join互斥

- lower 将字符串小写，upper大写,capwords首字母大写

  ```python
  s = "hello world"
  print(s.lower())
  >>> hello world
  print(s.upper())
  >>> HELLO WORLD
  
  print(string.capwords(s))
  >>>Hello World
  ```

- replace 方法，将字符串替换成另外一个字符串。

  ```python
  print("this is a car".replace("car", "bike"))
  >>> this is a bike
  ```

- strip方法，截取字符串的前后空格。

  ```python
  print("    geeodedasdasd.dasdasd".strip())
  >>> geeodedasdasd.dasdasd
  # 指定截取字符串前后字符的空格、* &
  print("*** &* Hello & *World **&&".strip(" *&"))
  >>> Hello & *World
  ```

- translate方法

  > translate 方法和 replace 方法类似，都是用来替换字符串中的某一部分，不同点在于translate 用来替换单个字符，而replace方法可以用来一个字符串，效率上translate ，更高。

# 总结

了解字符串的格式化和字符串方法。
