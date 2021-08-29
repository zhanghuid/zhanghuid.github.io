---
title: PHP - 锁相关
date: 2021-08-29 13:11:46
tags: PHP
---

## 起因
    想控制当 N 个请求时，到 PHP 端只会运行一次


## 踩坑
### 正确的代码【1】 - [use file exist]
```php
$path = './lock.txt';

if (file_exists($path)) {
    echo 1 . PHP_EOL;
    exit;
}

touch($path);
// echo 'running' . PHP_EOL;
sleep(10);

unlink($path);

echo 'done';
```

### 正确的代码【2】 - [use file flock]
```php
$handle = fopen('./lock.txt', 'w+');

$res = flock($handle, LOCK_EX | LOCK_NB, $block);

if ($res) {
    sleep(10);
    // echo fread($handle, filesize('./1.txt'));
    // sleep(3);
    flock($handle, LOCK_UN);
    fclose($handle);
    echo 'done';
} else {
    echo '文件已锁定';
}
```

### 正确的代码【3】 - [use redis lock]
```php
$token = mt_rand(1, 10000000);
$redis = new \Redis();
$redis->connect('192.168.20.214', 6379);

function lock() {
    global $redis;
    return $redis->set('my:lock', 1, ['nx', 'ex' => 10]);
}

function unlock() {
    $script = <<<'LUA'
if redis.call("get",KEYS[1]) == ARGV[1] then
    return redis.call("del",KEYS[1])
else
    return 0
end
LUA;

    global $redis;
    global $token;

    return $redis->eval($script, ['my:lock', $token]);
}

if (lock()) {
    sleep(10);
    echo 'done';
    unlock();
} else {
    echo '文件已锁定';
}
```

### 正确的 php-fpm 个数 
```php
phpbrew fpm start // mean php-fpm 大于 1
```

### 1. 错误的测试方式1
#### 测试方法
- 同一客户端 (浏览器) 发起 N 个请求

#### 结果
当对同一个 URL 发出多个请求时，即使是跨选项卡或窗口发出请求，浏览器也足够“聪明”，可以等待第一个请求完成，然后浏览器尝试运行后续请求

> [引用](https://stackoverflow.com/questions/24440731/php-flock-not-locking/30820654)

#### 改进
- 方法一：使用 `curl` 请求，可以正确返回
- 方法二：使用不同浏览器访问，可以正确返回

### 2. 错误的测试方式2
#### 测试方法
- 使用 php -S localhost:8000
- 如上方式，只有单一进程，即，处理也是顺序执行

#### 结果
当对同一个 URL 发出多个请求时，依旧是排队处理

#### 改进
- 换成 php-fpm


## 总结

### 正常访问 & 并发访问（1000 请求；100 并发）
代码1，在 客户端 执行期间被中断时，将无法再次运行，代码2 跟 代码3 可以（存在失效时间）



