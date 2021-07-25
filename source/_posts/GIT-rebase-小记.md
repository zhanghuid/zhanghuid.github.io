---
title: GIT-rebase 小记
date: 2021-07-21 16:00:14
tags: GIT
---

### 合并多个 commit 为一个
#### 1. 查看历史记录
```bash
git log --oneline

# 选择需要合并的分支
#c6d445a (HEAD -> master) third commit
#c133f69 second commit
#593a606 first commit
```

#### 2. 将 second 跟 third 合并
```bash
git rebase -i 593a606
```
> -i 的参数是不需要合并的 commit 的 hash 值，这里指的是第一条 commit

#### 3. 选择合适的操作
> pick：保留该commit（缩写:p）
> reword：保留该commit，但我需要修改该commit的注释（缩写:r）
> edit：保留该commit, 但我要停下来修改该提交(不仅仅修改注释)（缩写:e）
> squash：将该commit和前一个commit合并（缩写:s）
> fixup：将该commit和前一个commit合并，但我不要保留该提交的注释信息（缩写:f）
> exec：执行shell命令（缩写:x）
> drop：丢弃该commit（缩写:d）

如上，应该选择
```
1 pick c133f69 second commit
2 s c6d445a third commit # 将 pick 改为 s
```

:wq 后，编辑一下 commit message

#### 4. 最后的最后，来个强推
```
git push --force-with-leas 你的远程分支
```

> 补充一个sourcetree 的使用方式文档
[git的GUI工具Sourcetree使用及命令行对比](https://www.huaweicloud.com/articles/63ed78162899759873f867de6940f5a6.html)

> 引用
[「Git」合并多个 Commit](https://www.jianshu.com/p/964de879904a)
[【Git】rebase 用法小结](https://www.jianshu.com/p/4a8f4af4e803)
[Git 更安全的强制推送，--force-with-lease](https://blog.walterlv.com/post/safe-push-using-force-with-lease.html)