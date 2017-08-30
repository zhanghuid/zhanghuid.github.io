---
title: 'Mutate, Linux平台上的Alfred'
date: 2017-06-02 17:29:06
tags: ubuntu
---
## Mutate, Linux平台上的Alfred
    Mutate 是一个受 Alfred 启发而设计的应用启动器，通过快捷键组合可以方便您快速执行常见任务

> 图片如下:
![mutate](./Mutate-Linux平台上的Alfred/mutate.png)

### 安装
#### 编译安装
1. 安装依赖
```
sudo apt-get install build-essential qt5-qmake qt5-default libgtk2.0-dev libqt5x11extras5-dev libboost-regex-dev
```
2. 下载并编译
```
git clone https://github.com/qdore/Mutate.git
cd Mutate/src
qmake
make
```
3. 安装
```
sudo make install
cd ..
sudo cp info/mutate.png /usr/share/icons
sudo cp info/Mutate.desktop /usr/share/applications
mkdir -p ~/.config/Mutate
cp -R config/* ~/.config/Mutate
chmod -R a+x ~/.config/Mutate/scripts
chmod -R a+w ~/.config/Mutate
sed -i "s|{home}|$HOME|g" ~/.config/Mutate/config.ini
```

4. 快捷键
> 默认吊起快捷键 Ctrl + d

5. 功能
- Find Applications & Files

![以关键字搜索应用程序，按类别搜索文件](./Mutate-Linux平台上的Alfred/find_applications&files.png)

- Find Files

![查找文件](./Mutate-Linux平台上的Alfred/find_files.png)

- Calculate(thanks t413)
```
NOTE:You must install sympy first:
sudo apt-get install python-pip
sudo pip install sympy
```

![Calculate](./Mutate-Linux平台上的Alfred/calc.png)

- Kill Processes

![kill_pocesses](./Mutate-Linux平台上的Alfred/kill_pocesses.png)

- Google Translate
Select some words use your mouse, then press Ctrl+T (user configurable): 

![Google_Translate](./Mutate-Linux平台上的Alfred/Google_Translate.jpg)

Or type 'tr' and some words: 

![tr](./Mutate-Linux平台上的Alfred/tr.png)


- Quickly Search the Web

Google Search

![Google Search](./Mutate-Linux平台上的Alfred/Google_Search.png)


#### 更多详情请看: 
[网址](https://github.com/qdore/Mutate)

