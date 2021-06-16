---
title: msyql - show processlist
date: 2021-01-14 17:38:10
tags: mysql
---

### 命令解说
#### 1. 作用
    就是查看当前mysql正在执行的进程,主要有两个作用：
- 查看慢查询的sql是哪个
- 查看出现锁的sql是哪个

#### 2. 查看命令
```bash
show processlist;
```

#### 3. command字段
该字段的取值主要有：query和sleep两种结果。

（1）关注就是query命令。

（2）值为 sleep的理解

sleep是在等待prestatement（sql语句），它已经建立了connect，但是还没有开始执行，所以sleep状态多的话，那么数据库连接池就会被占用。所以：有时候sleep增多的原因可能是慢查询sql，但是sleep不是慢查询，因为它还没有开始执行。



### 查看慢查询 

1. 慢查询，针对的是超过一定时间的查询。所以此时只需要关注两个因素：

- command字段，值为query表示的是查询操作。
- time字段，显示的查询时间。

2. 从网上找到的kil慢查询的方法

- 第一步 查找出慢查询sql对应的进程id
``` mysql
select id from prosslist where COMMAND = 'query' and time > 60*10
```

time字段的单位是秒，上面是查找10分钟慢查询sql
- 第二步 kill掉查找到慢查询,在mysql客户端执行如下：
`kill 3;`




> 引用
[Mysql show processlist命令解析](http://www.heartthinkdo.com/?p=434)