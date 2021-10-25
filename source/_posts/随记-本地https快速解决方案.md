---
title: 随记 - 本地https快速解决方案
date: 2021-10-25 21:30:37
tags:
---


### 环境准备
1. 服务器： 192.168.20.214

### 步骤
1. 安装程序
> 参考 -> linux 下的安装 mkcert
2. 为服务端生成 CA 证书
```
mkcert domain1
```
3. 使用生成的证书
```nginx
# nginx 为例子
server {
# 服务器端口使用443，开启ssl, 这里ssl就是上面安装的ssl模块
    listen       443 ssl;
# 域名，多个以空格分开
    server_name  demo2.kit;

# ssl证书地址
    ssl_certificate     /home/work/cert/demo2.kit.pem;  # pem文件的路径
	ssl_certificate_key  /home/work/cert/demo2.kit-key.pem; # key文件的路径

# ssl验证相关配置
	ssl_session_timeout  5m;    #缓存有效期
	ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;    #加密算法
	ssl_protocols TLSv1 TLSv1.1 TLSv1.2;    #安全链接可选的加密协议
	ssl_prefer_server_ciphers on;   #使用服务器端的首选算法

	location / {
	    root   /work/web/kit/;
	    index  index.html index.htm;
	}
    access_log  /work/logs/nginx/kit.com.access.log;
    error_log  /work/logs/nginx/kit.com.error.log;

}
```
4. 下载客户端 ca 证书
```
cp /home/work/cert/demo2.kit.pem /home/work/cert/demo2.kit.crt
sz /home/work/cert/demo2.kit.crt
```
5. 为客户端安装证书
```
window: 双击  > 一路下一步 > 完成
mac: 双击 > 设置 `始终信任`
```

### 引用
- [本地https快速解决方案——mkcert](https://blog.dteam.top/posts/2019-04/%E6%9C%AC%E5%9C%B0https%E5%BF%AB%E9%80%9F%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88mkcert.html)
- [linux 下的安装 mkcert](https://mazq.cn/linux/2020/07/17/%E5%B1%80%E5%9F%9F%E7%BD%91%E5%86%85%E5%BF%AB%E9%80%9F%E9%A2%81%E5%8F%91%E8%87%AA%E7%AD%BE%E5%90%8D%E8%AF%81%E4%B9%A6-%E4%BD%BF%E7%94%A8mkcert/)