---
title: PHP - 多版本管理 - phpbrew
date: 2021-08-29 13:49:24
tags: PHP
---


### 基础用法

| 命令                    | 描述              |
| ----------------------- | ----------------- |
| phpbrew known         | 列出已知 PHP 版本 |
| phpbrew use php-7.4.2 | 切换版本          |


### 扩展安装
```bash
# 安装 zlib  
phpbrew ext install zlib

# 安装 xdebug 
phpbrew ext install xdebug stable

# 安装 iconv, 带自定义的 iconv 安装路径 
phpbrew ext install iconv --with-iconv=/usr/local/opt/libiconv
```

[see more](https://github.com/phpbrew/phpbrew/blob/master/README.cn.md)


### tips

#### 安装失败 
##### 问题：
tar: Error opening archive: Unrecognized archive format

##### 解决方案：
```bash
curl -L https://www.php.net/get/php-7.2.16.tar.bz2/from/this/mirror -o ~/.phpbrew/distfiles/php-7.2.16.tar.bz2

```

##### 原理
提前将源码文件下载到 指定的 `distfiles` 下，再执行 `phpbrew install php-7.2.16` 时，会直接从 `distfiles` 目录下查找

