---
title: PHP-字符串下标形式访问小记
date: 2021-07-14 17:39:47
tags:
---

### 代码
```php

// waring ==> 修改失败
// PHP Warning:  Cannot use a scalar value as an array in /Users/huid/web/learns/php-learn/error.php on line 12
$out = 4238;
// waring ==> 修改成功
// PHP Warning:  Illegal string offset 'aaa' in /Users/huid/web/learns/php-learn/error.php on line 9
$out = '4238';

$out['aaa'] = true;

echo $out;
```


### 结论
> 1的情况，会修改成功，输出 1238
> 2的情况，会修改成功，输出 1238

### 尝试理解
#### 问题1：为啥是 1238?
> 答：$out[] 这种模式下，代表 会以数组的形式访问 $out（字符串赋值时），$out['aaa'] 会变成 $out[0] 去访问下标为 0 的 $out 字符串
> 类比：'aa' == 0 这种情况； 可将 $out['aaa'] 换成 $out[3] 试一下效果

#### 问题2: 为啥 整型 会失败？
> 答：整型不能以数组下标的形式访问