---
title: 'Python - ModuleNotFoundError: No module named 小记'
date: 2021-08-12 00:35:03
tags:
---

## 演示 demo
```bash
├── a.py
└── bb
    ├── __pycache__
    │   ├── __init__.cpython-39.pyc
    │   └── b.cpython-39.pyc
    └── b.py
```

## 代码
### a.py
```
#!/usr/bin/python
# -*- coding: UTF-8 -*-

# from bb.b import echo_b

def echo_a():
    print('hello; from aaa')

if __name__ == '__main__':
    echo_a()

```

### b.py
```
#!/usr/bin/python
# -*- coding: UTF-8 -*-

from a import echo_a


def echo_b():
    print('hello; from bb')

if __name__ == '__main__':
    echo_a()

```

## 测试

### 问题描述
```bash
# 调用
python bb/b.py

# 异常
# ModuleNotFoundError: No module named 'a'
```

### 解决方案
```bash
export PYTHONPATH=your path
```

### 解释 & 说明
```python
#!/usr/bin/python
# -*- coding: UTF-8 -*-

import sys

# 输出 python执行器所查找的文件目录
print(sys.path)

# PYTHONPATH 设定 这个环境变量的值，可以让 sys.path 新增一个路径
# 类似
sys.path.insert(1, 'your path')
# or
sys.path.append('your path')
```

