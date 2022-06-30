---
title: python 学习(五)
tags:
  - PYTHON
thumbnail: 'https://i.imgur.com/JjIQyzR.png'
categories:
  - 学习
date: 2018-11-13 23:54:08
toc: true
---


> 字典,类似于javascript 中的map 对象
>

<!-- more -->

## 创建和使用字典 `dict` 函数
1. 字典可以用下面的创建

>字典的 key 值是唯一的。

```python
phoneBook = {"bill":"1234","MIKE":"312312"}
```

2. 可以用 dict 函数，通过其他映射（如其他的字段）或简直对的序列建立字典

> 第一个值表示 key，第二个值标识 value

```python
items = [["billl","21312321"],(321321,"3213"),["martty","dsada"]]
print(dict(items))
>>> {'billl': '21312321', 321321: '3213', 'martty': 'dsada'}
```

3. dict 函数还可以通过关键字参数来创建字典

>如果 dict 函数如果不指定参数，那么该函数会返回一个空的字典

```python
a = dict(name="312321", number="222", age=111)
print(dict(a))
>>> {'name': '312321', 'number': '222', 'age': 111}
```


## 字典的基本操作

1. 如下：

```python

dict = {}  # 定义一个字典
dict[20] = "Bill"  # 向字典 dict 中添加整数类型的key
dict["Mike"] = {'age': 30, "salary": 3000}  # 向字典 dict 中添加字符串的key
dict[(12, "Mike", True)] = "hello"  # 向字典 dict 中添加元组类型的key
print(dict)
>>> {20: 'Bill', 'Mike': {'age': 30, 'salary': 3000}, (12, 'Mike', True): 'hello'}
```
2. in 操作，检查 **dict** 中是否包含有健为 `key`的项，只能查找 key ，不是 value
```python
Demo = {
    "sublime": {
        "language": ["java", "python"],
        "org": "sublime 开源"
    },
    "webstorm": {
        "language": ["python", "php"],
        "org": "webstorm 基金会"
    },
    "vs code": {
        "language": ["javascript"],
        "org": "javascript 开源"
    }
}

de = input("请输入的编辑器名字")
de1 = de.replace(" ", " ").lower()
# 检查 dict 中是否包含有健为 key 的项
if de1 in Demo:
    print(Demo[de1])

>>> 请输入的编辑器名字webstorm
    {'language': ['python', 'php'], 'org': 'webstorm 基金会'}
```

## 字典的格式化字符串

1. 对字典对字符串进行格式化，并且使用元组和`%`对字符串进行格式化的方式对比

> 使用%和元组格式化字符串

```python
values = (1, 3, "dsada")
str1 = "%d dsada,   xyt %d,  %s world"
print(str1 % values)
>>> 1 dsada,   xyt 3,  dsada world
```

2. 定义字符串模板

> `format_map`方法使用的字符串模板中，格式化采用一对花括号`{}`,如果格式化模板中的格式化参数在字典中为找到，系统会抛出异常。

```python
values1 = {"title": "webstorm", "url": "https://www.baidu.com"}
str2 = """

<html>
    <title>{title}</title>
    <body>
        <a href="{url}"></a>
    </body>
</html>

"""
print(str2.format_map(values1))

>>>
<html>
    <title>webstorm</title>
    <body>
        <a href="https://www.baidu.com"></a>
    </body>
</html>
```



## 序列与迭代

1. 获取字段中key的列表

```python
dict = {"x": 1, "y": 2, "z": 7}

for a in dict:
    print(a)
>>>
x
y
z
```

2. 同时获取字典中的key和value列表

>使用字典中的**items**方法，转换为元组的序列 `dict_items([('x', 1), ('y', 2), ('z', 7)])`

```python
for a, y in dict.items():
    print(a, y)
>>>
x 1
y 2
z 7
```

3. 并行迭代

同时迭代的两个或多个序列,用range函数获取序列索引的范围

```python
names = ["bill", "marry", "john"]
ages = [30, 40, 60]

for i in range(len(names)):
    print(names[i], ages[i], end=" ")
>>> bill 30 marry 40 john 60
```

4. 压缩序列

> 这里的压缩序列值的使用zip函数，将两个或者多个序列的对应的元素作为一个元组放在一起，如果压缩的两个或者多个序列的元素个数不相同，以元素个数少的为准。

```python
a = ["dsa", "测试1", "测试机哦i2"]
b = ["httos/ldasd", "hjttps:>dedsa", "123213125dsa", "ccccccc"]
print(zip(a, b))

for c in zip(a, b):
   print(c, end=" ")
>>> ('dsa', 'httos/ldasd') ('测试1', 'hjttps:>dedsa') ('测试机哦i2', '123213125dsa')
```

## 字典中的方法
1. **clear** 方法

```python
dict = {"a": "c", "b": "2"}

dict.clear()

print(dict)

>>> {}
```
> 注意点：clear方法，如果两个变量同时指向一个字典变量时，clear方法会同是清空指向的变量。
如：
```python
dict = {"a": "c", "b": "2"}
dict2 = dict
dict = {}
print(dict2)
>>> {'a': 'c', 'b': '2'}

# 对比以下的
dict = {"a": "c", "b": "2"}
dict2 = dict
dict.clear()
print(dict2)
>>> {}
```
2. **copy** 和 **deepcopy** 函数

- copy 方法用于复制一个字典，该方法返回复制后的新字典
  ```python
  # 浅复制
  dict = {"a": "c", "b": "2"}
  dict2 = dict.copy()
  print(dict2)
  >>> {'a': 'c', 'b': '2'}
  ```

- deepcopy函数用来解决 copy 中字典两层以下层的复制，也就说对于第二层，都是指向同一个值
    不管修改原字典中的元素，还是修改复制之后的字典的元素，原字典和新字典中的元素都会改变。
      ```python
     # 复制
    dict = {"a": "c", "b": "2", "c": ["1", "2", "3"]}
    dict2 = dict.copy()
    dict2["c"][0] = 'c1'
    print('dict', dict)
    print('dict2', dict2)
    >>> 
    dict {'a': 'c', 'b': '2', 'c': ['c1', '2', '3']}
    dict {'a': 'c', 'b': '2', 'c': ['c1', '2', '3']}
    # 解决方案
    from copy import deepcopy
    dict = {"a": "c", "b": "2", "c": ["1", "2", "3"]}
    dict2 = deepcopy(dict)
    dict2["c"][0] = 'c1'
    print('dict', dict)
    print('dict2', dict2)
    >>> 
    dict {'a': 'c', 'b': '2', 'c': ['1', '2', '3']}
    dict2 {'a': 'c', 'b': '2', 'c': ['c1', '2', '3']}
      ```

3. **fromkey** 方法

   根据**key**建立新的字典，在新的字典中，所有key都有相同的默认值，默认值为None

   ```python
   x = {}.fromkeys(["name", "age", "salary"])
   print(x)
   >>> {'name': None, 'age': None, 'salary': None}
   
   # 第二参数，用于处理所有默认值
   x = {}.fromkeys(["name", "age", "salary"], "默认值")
   print(x)
   >>>  {'name': '默认值', 'age': '默认值', 'salary': '默认值'}
   ```

4. **get** 方法

   **get** 方法用于更宽松的方式从字典中获取 **key** 的 **value**，一般我们获取一个采用，`dict[key]`，如果 **value** 不存在，则会报错。

   我们可以采用以下的方法：

   ```python
   x = {}.fromkeys(["name", "age", "salary"], "默认值")
   print(x.get("cxcc", 0))
   >>> 0
   ```

5. **items **和**key** 方法

   **items** 用来返回字典中所有的 `key-value`对。**key** 用来返回

   ```python
   x = {}.fromkeys(["name", "age", "salary"], "默认值")
   print(x.items())
   >>> dict_items([('name', '默认值'), ('age', '默认值'), ('salary', '默认值')])
   print(x.keys())
   >>> dict_keys(['name', 'age', 'salary'])
   ```

6. **pop **方法和**popitem **方法

   用于弹出字典中元素，**pop** 用于指定key的弹出,**key-value** 键值对，**popitem** 弹出最后一个 **key-value** 键值对。

   ```python
   x = {}.fromkeys(["name", "age", "salary"], "默认值")
   print(x.pop("name"))
   >>> 默认值
   print(x.popitem())
   >>> ('salary', '默认值')
   ```

7. **setdefault** 方法

   用户设置字典的 **key** 的默认值，接受两个参数，第一个为 **key**，第二个为 **value**

   ```python
   x = {}
   x.setdefault("name", "bill")
   print(x)
   >>>{'name': 'bill'}
   # 向x字典中添加age的key
   x = {}
   x.setdefault("name", "bill")
   print(x)
   x.setdefault("age")
   print(x)
   >>> {'name': 'bill', 'age': None}
   ```

8. **update **方法

   可以用一个字典中元素更新到另外一个字典。

   ```python
   dict = {
       "title": "大飒飒",
       "website": "https://www"
   }
   dict2 = {
       "title": "大飒飒",
       "website": "https://www.vineo.cn",
        "copyright": "vineo"
   }
   dict.update(dict2)
   print(dict)
   >>> {'title': '大飒飒', 'website': 'https://www.vineo.cn', 'copyright': 'vineo'}
   ```

9. **value **方法

   用迭代器的方式返回字典中的值。

   ```python
   dict = {
       "title": "大飒飒",
       "website": "https://www"
   }
   dict2 = {
       "title": "大飒飒",
       "website": "https://www.vineo.cn",
       "copyright": "vineo"
   }
   dict.update(dict2)
   print(dict.values())
   >>>
   dict_values(['大飒飒', 'https://www.vineo.cn', 'vineo'])
   ```

## 总结

字典是一个重要的序列形式，主要根据key查询value。经常被用到需要快速查找定位，但是数据量不是很大的数据的场景。
