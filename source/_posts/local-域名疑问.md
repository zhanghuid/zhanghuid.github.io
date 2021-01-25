---
title: .local 域名疑问
date: 2021-01-25 14:28:03
tags: dns
---

## 起因
    通过谷歌浏览器访问 `fed-static.local` 这个域名时，响应的时长总为 大于 `5s`

## 使用curl
### 情况1：
1. `curl -vo /dev/null 'http://fed-static.local'`
2. 结果输出
```bash
❯ curl -vo /dev/null 'http://fed-static.local'
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:--  0:00:04 --:--:--     0*   Trying 192.168.20.214...
* TCP_NODELAY set
* Connected to fed-static.local (192.168.20.214) port 80 (#0)
> GET / HTTP/1.1
> Host: fed-static.local
> User-Agent: curl/7.64.1
> Accept: */*
>
< HTTP/1.1 200 OK
< Server: nginx/1.13.3
< Date: Mon, 25 Jan 2021 06:31:09 GMT
< Content-Type: text/html; charset=utf-8
< Content-Length: 3340
< Last-Modified: Sun, 03 Jan 2021 13:57:02 GMT
< Connection: keep-alive
< Vary: Accept-Encoding
< ETag: "5ff1cd2e-d0c"
< Accept-Ranges: bytes
<
{ [3340 bytes data]
100  3340  100  3340    0     0    650      0  0:00:05  0:00:05 --:--:--   783
* Connection #0 to host fed-static.local left intact
* Closing connection 0
```

### 情况2:
1. `curl -vo /dev/null -H 'host:fed-static.local' 'http://192.168.20.214'`
2. 结果输出：
```bash
❯ curl -vo /dev/null -H 'host:fed-static.local' 'http://192.168.20.214'
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0*   Trying 192.168.20.214...
* TCP_NODELAY set
* Connected to 192.168.20.214 (192.168.20.214) port 80 (#0)
> GET / HTTP/1.1
> Host:fed-static.local
> User-Agent: curl/7.64.1
> Accept: */*
>
< HTTP/1.1 200 OK
< Server: nginx/1.13.3
< Date: Mon, 25 Jan 2021 06:33:18 GMT
< Content-Type: text/html; charset=utf-8
< Content-Length: 3340
< Last-Modified: Sun, 03 Jan 2021 13:57:02 GMT
< Connection: keep-alive
< Vary: Accept-Encoding
< ETag: "5ff1cd2e-d0c"
< Accept-Ranges: bytes
<
{ [3340 bytes data]
100  3340  100  3340    0     0   191k      0 --:--:-- --:--:-- --:--:--  191k
* Connection #0 to host 192.168.20.214 left intact
* Closing connection 0
```

## 使用浏览器

- 谷歌内核的浏览器，在dns lookup的时间要5秒
- safari/firfox 正常响应，没有5的dns lookup


## 原因猜想：
1. [为什么是 5 秒？ man resolv.conf 可以看到 glibc 的 resolver 的缺省超时时间是 5s](https://www.cnblogs.com/bonelee/p/7567029.html)
2. [mDNS的域名与普通DNS的域名是通过后缀.local区分开来的](https://www.bookstack.cn/read/kubernetes-practice-guide/troubleshooting-cases-dns-lookup-5s-delay.md)
3. [维基百科解说.local](https://en.wikipedia.org/wiki/.local)