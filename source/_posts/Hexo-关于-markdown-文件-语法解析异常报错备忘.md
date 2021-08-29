---
title: Hexo 关于 markdown 文件 语法解析异常报错备忘
date: 2021-08-12 10:18:54
tags:
---

### 如果在 markdown 内容这么写：
``` markdown
> 引用

1. [如何开启nginx服务的rewrite_log](http://www.yuzhewo.com/2015/11/01/%E5%A6%82%E4%BD%95%E5%BC%80%E5%90%AFnginx%E6%9C%8D%E5%8A%A1%E7%9A%84rewrite-log/)
2. [深入理解Nginx的rewrite模块](https://www.cnblogs.com/sunsky303/p/12718378.html)
3. [在开发环境下使用nginx重写uri及代理功能](https://juejin.cn/post/6844903847295451149#heading-1)![](http://)
```

### 报错:
```
err: TypeError [ERR_INVALID_URL]: Invalid URL: http://
```

### 修复
将 markdown 内容修复即可，即如上第3点的链接写法不合法的地方改正