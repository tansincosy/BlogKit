---
layout: post
title: "python 学习(二)"
thumbnail: https://i.imgur.com/JjIQyzR.png
abstract: 主要介绍流程控制，（条件语句和循环语句）
toc: true
tags:
  - PYTHON
categories:
  - 学习
---


# 基础知识

## print函数
<!-- more -->

> 表示打印

- **print**可以传入多个参数，那么相对应的首尾输出。(可以理解chrome 浏览中`console `函数)例如:

  ```python
  print(1, 3, 4, 5, 6, 7)
  >>>1 3 4 5 6 7
  ```

- 当我们输出`print("apple", ",", "orange")`返回的结果有空格；`apple , orange`。解决方法:

  ```python
  print("apple"+","+"orange")
  >>>apple,orange
  
  
  # 采用print特有的方法，就是priny函数最后参数添加sep=","
  print("apple", "orange", "banana", sep=",")
  >>>apple,orange,banana
  ```

- **print**函数输出结果，结果后面会默认添加一个`\n`换行符，可以通过`end=""`参数，**引号中可以添加参数**可以添加参数例如：

  ```python
  x = 12345
  y = 0xF98A
  z = 0b1100010110
  print('2', bin(x), end="|")
  print('8', oct(x), end="|")
  print('16', hex(x), end="|")
  >>>2 0b11000000111001|8 0o30071|16 0x3039|
  ```

## 赋值操作

> =

- python可以多个赋值操作

  ```python
  x, y, z = 12345, 0xF98A, 0b1100010110
  
  print('2', bin(x), end="|")
  print('8', oct(x), end="|")
  print('16', hex(x), end="|")
  >>>2 0b11000000111001|8 0o30071|16 0x3039|
  ```

  > python 这种赋值方式，称之为序列解包，确保左右赋值相同，不然会报错。

- 链式赋值

  ```python
  a = b = 9
  print(a, b)
  >>>9 9
  ```

- 增量赋值

  ```python
  a = b = 9
  a *= 2   # ===> a=a*2
  print(a)
  >>>19
  
  a /= 2 # ===> a=a/2
  print(a)
  >>>4.5
  
  a %= 2  # ===> a=a%2
  print(a)
  >>>1
  ```

## 用缩进创建代码块

> 虽然**tab**也是可以进行缩进代码块，python将一个**tab**字符解释到下一个**tab**字符位置移动，而一个**tab**字符是8个字符，python推荐使用4个空格来进行缩进。

因此整个代码格式如下：

```python
this is a code
this is a second code:
    this is block
    this is second block    
this is escaped the inner block
```

## 条件语句（逻辑控制）

### boolean 和boolean 变量

- boolean变量：**True**和**False**,注意大小写。

- 下面的值会被解释为**False**：`None 0 "" () [] {}`。

- 在python底层，是将**Flase**看成**0**，**True**看成**1**，例如：

  ```python
  print(True == 1)
  >>>True
  print(False == 0)
  >>>True
  ```

- 可以bool将一些变量，转换为boolean值。

  ```python
  print(bool(""))
  >>>False
  print(bool("1"))
  >>>True
  ```

### 条件语句（if,else 和elif）

> 和其他语言对比：
>
> if和else 和其他语言用法相似，
>
> elif相当与其余语言的else if用法。

注意一点：python中没有switch逻辑判断语句。

基本用法和**java**和**JavaScript**用法相似。支持嵌套

### 比较运算符

| 逻辑表达式 |                             描述                             |
| :--------: | :----------------------------------------------------------: |
|    x==y    |                            x等于y                            |
|    x<y     |                            x小于y                            |
|    x>y     |                            x大于y                            |
|    x<=y    |                          x小于等于y                          |
|    x>=y    |                          x大于等于y                          |
|    x!=y    |                           x不等于y                           |
|   x is y   |                      x 和 y是同一个对象                      |
| x is not y |                     x 和 y是不同一个对象                     |
|   x in y   |   x是y的容器的成员，如：y =[1,3,54,6] x=1 ; x in y >>>True   |
| x not in y | x是y的容器的成员，如：y =[1,3,54,6] x=12 ; x not in y >>>True |
|   x or y   |                            x 或y                             |
|  x and y   |                            x 且y                             |

- python 比较字符串时，会比较字符串的**ASCII**,如：

  ```python
  print("hello" > "Hello")
  >>>True
  ```

  > 会首先比较**h**和**H**的 **ASCII**值，前面为*真*后面就不会比较

- 如果一个字符串是另一个字符串的前缀，那么python会认为字符串较长的更大一些

  ```python
  print("hello" > "hello world")
  >>>False
  ```

- 判断相等

  ```python
  x = y = [1, 2, 3]
  z = [1, 2, 3]
  print(x == y)
  >>> True
  print(x == z)
  >>> True
  print(x is y)
  >>> True
  print(x is z)
  >>> False
  print(x is not z)
  >>> True
  ```
  > 可以参照类似堆和栈方式，来理解。

- `in`和`not in`运算符

  ```python
  x = [1, 2, 3]
  y = 3
  print(y in x)
  >>>True
  
  #除了可以用来判断容器，也可以判断字符串是否包含其中一个字符串
  s = "hello world"
  print("h" in s)
  >>>True
  ```

- `or`和`and`用来表示多个逻辑的组合在一个。

### 断言
- 在python 语言中，要使用 assert 语句。
- assert 后面指定断言的条件表达式，如果为False，就会抛出异常
  ```python
  value = 20
  assert value < 10 or value > 30
  >>>Traceback (most recent call last):
    File "E:/webStromWorkSpace/python-learn/basic/test.py", line 48, in <module>
      assert value < 10 or value > 30
  AssertionError
  ```

### 循环

#### `while`循环

```python
x = 1
while x <= 10:
    print(x)
    x += 1
>>>1
2
3
4
5
6
7
8
9
10
```



#### `for`循环

```python
y = [1, 3, 4, 5, 6, 7, 8]
for z in y:
    print(z)
>>> 1
3
4
5
6
7
8
```

#### 跳出循环

有时候，需要从循环体中跳出循环，这时我们就要用到**break**语句。例如：

```python
x = 0
while x < 100:
    if (x == 5):
        break
    print(x)
    x += 1
>>>
0
1
2
3
4
```

与break对应的，还有**continue**，表示结束本地循环。

> 不同点在于，continue会结束循环，后面循环还是继续的。

**还有运用while语句时，要注意死循环的风险**

#### 在循环中使用else

我们来观察一下代码：

```python
import random

x = 0
flag = False
while x < 10:
    x += 1
    if x == random.randint(1, 20):
        flag = True
        print(x)
        break
if not flag:
    print("没有中断while循环")
```

> 从1-10，判断x是否等于 1-20 的随机数，如果相等，打印数字，否则**输出没有中断while循环**，
>
> 我们可以用else来处理

```python
import random

x = 0
flag = False
while x < 10:
    x += 1
    if x == random.randint(1, 20):
        flag = True
        print(x)
        break
else: # while 循环的 else子语句
    print("没有终端while循环")
    

numbers = [1, 2, 3, 4, 5, 6]
for a in numbers:
    if a == random.randint(1, 20):
        print(a)
        break
else:
    print("退出循环")

```

#### 使用exec和eval执行求职字符串

1.`exec`类似JS的eval函数，可以将字符串当作JavaScript代码进行执行。python也有类似的功能，就是使用exec函数。

```python
exec("x=1")
exec("print(x)")
>>>1
```

> - 从代码中可以看到，执行两条语句，而且能够输出1，说明exec在python还能共享上下文，也就说通过python代码，与python解释器执行的方式是完全一样的。
> - 还有一个注意点，尽可能不要用户全局作用下执行Python代码，否则可能会出现命名冲突现象。

2.`eval`和`exec`类似,不同点在于，**eval**用于执行表达式，并且返回结果；而**exec**并不会返回任何值。

```python
scope = {'x': 20}
arges = {'y': 40}
print(eval('x+y', scope, arges))
>>>60
```




