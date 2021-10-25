---
title: GO - mod replace 简单使用
date: 2021-09-07 00:15:26
tags: GO
---

### 需求分析
    想直接修改远程包的代码，或者本地还没发布到线上，直接用本地的包时，可以这么玩

### 流程
1. mkdir ~/your-project-path
2. cd ~/your-project-path && go mod init huid-gotour
3. vim main.go
```go
package main

import "github.com/mitchellh/go-ps"

func main() {
    ps, _ := ps.Processes()
	log.Println(ps[0].Executable())

	for pp := range ps {
		log.Printf("%d %s\n", ps[pp].Pid(), ps[pp].Executable())
	}
}
```
4. 假设想改包内源码,为了本地可以快速测试，可按如下操作
```bash
# 1. mkdir src/vendor/huid/go-ps, 将 github.com/mitchellh/go-ps 代码复制进去
# 2. 修改 根目录下的 go.mod文件
require github.com/shirou/gopsutil/v3 v3.21.8
replace github.com/mitchellh/go-ps => /your-path/huid/go-ps

```
5. 执行命令
```bash
go mod vendor
go run xxx
```

