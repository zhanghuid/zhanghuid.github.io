---
title: hexo 更换主题小记
date: 2018-03-26 16:10:10
tags: hexo
toc: true
---

### 目录划分
1. `github` 上新增 `zhanghuid.github.io` 仓库
2. 新开 `hexo` 分支，存放文章源码
3. `master` 分支存放 `hexo d` 后产生的静态页面

### 备忘

1. 写作流程
``` bash
1.1. git clone git@github.com:zhanghuid/zhanghuid.github.io.git
1.2. cnpm install
1.3. hexo g // 编译生成静态页面
1.4. hexo s // 开启服务器
1.5. hexo new xxx // 新建写作模版
1.6. git push origin hexo:hexo  // 推送原稿到hexo分支
1.7. hexo d // 部署到github上
```
2. 细节注意
```bash
2.1. 由于主题是直接clone下来
git clone https://github.com/tufu9441/maupassant-hexo.git themes/maupassant
2.2. 所以切换hexo分支，push到github上时，maupassant主题不会跟着上去（这是别人家的仓库）
2.3. 目前的做法是，记下主要的配置文件信息，到时直接覆盖
```

3. 主要参考
> 3.1 [大道至简——Hexo简洁主题推荐](https://www.haomwei.com/technology/maupassant-hexo.html) <br/>
> 3.2 [WARN No layout](https://www.zhihu.com/question/38781463) <br/>
> 3.3 [hexo d报Permission denied](http://www.cnblogs.com/xinxiandong/p/3867505.html) <br/>

4. 主要配置文件

- 根目录下 package.json
```json
{
  "name": "hexo-site",
  "version": "0.0.0",
  "private": true,
  "hexo": {
    "version": "3.6.0"
  },
  "dependencies": {
    "hexo": "^3.2.0",
    "hexo-asset-image": "^0.0.3",
    "hexo-deployer-git": "^0.3.0",
    "hexo-generator-archive": "^0.1.4",
    "hexo-generator-category": "^0.1.3",
    "hexo-generator-feed": "^1.2.2",
    "hexo-generator-index": "^0.2.0",
    "hexo-generator-search": "^2.2.2",
    "hexo-generator-tag": "^0.2.0",
    "hexo-renderer-ejs": "^0.2.0",
    "hexo-renderer-jade": "^0.4.1",
    "hexo-renderer-marked": "^0.2.10",
    "hexo-renderer-pug": "^0.0.5",
    "hexo-renderer-sass": "^0.3.2",
    "hexo-renderer-stylus": "^0.3.1",
    "hexo-server": "^0.2.0"
  }
}
```

- 根目录下 _config.yml
```yml
# Hexo Configuration
## Docs: https://hexo.io/docs/configuration.html
## Source: https://github.com/hexojs/hexo/

# Site
title: zhanghuid
subtitle: huid 的 陋室
description: write down something
author: zhanghuid
language: zh-CN
timezone:
avatar: https://avatars2.githubusercontent.com/u/12711819?v=4&u=966b0349b101f40e03926b472c47166c3c9da2ba&s=400

# URL
## If your site is put in a subdirectory, set url as 'http://yoursite.com/child' and root as '/child/'
url: http://writewrite.net
root: /
permalink: :year/:month/:day/:title/
permalink_defaults:

# Directory
source_dir: source
public_dir: public
tag_dir: tags
archive_dir: archives
category_dir: categories
code_dir: downloads/code
i18n_dir: :lang
skip_render:

# Writing
new_post_name: :title.md # File name of new posts
default_layout: post
titlecase: false # Transform title into titlecase
external_link: true # Open external links in new tab
filename_case: 0
render_drafts: false
post_asset_folder: true
relative_link: false
future: true
highlight:
  enable: true
  line_number: true
  auto_detect: true
  tab_replace:

# Category & Tag
default_category: uncategorized
category_map:
tag_map:

# Date / Time format
## Hexo uses Moment.js to parse and display date
## You can customize the date format as defined in
## http://momentjs.com/docs/#/displaying/format/
date_format: YYYY-MM-DD
time_format: HH:mm:ss

# Pagination
## Set per_page to 0 to disable pagination
per_page: 10
pagination_dir: page

# Extensions
## Plugins: https://hexo.io/plugins/
#RSS订阅
plugin:
- hexo-generator-feed
#Feed Atom
feed:
type: atom
path: atom.xml
limit: 20

## Themes: https://hexo.io/themes/
theme: maupassant

# Deployment
## Docs: https://hexo.io/docs/deployment.html
deploy:
  type: git
  repo: git@github.com:/zhanghuid/zhanghuid.github.io.git
  branch: master
```

- 主题配置文件 `themes/maupassant/_config.yml`
```yml
fancybox: false ## If you want to use fancybox please set the value to true.
disqus: ## Your disqus_shortname, e.g. username
uyan: ## Your uyan_id. e.g. 1234567
livere: ## Your livere data-uid, e.g. MTAyMC8zMDAxOC78NTgz
changyan: ## Your changyan appid, e.g. cyrALsXc8
changyan_conf: ## Your changyan conf, e.g. prod_d8a508c2825ab57eeb43e7c69bba0e8b
gitment:
  enable: false ## If you want to use Gitment comment system please set the value to true.
  owner: ## Your GitHub ID, e.g. username
  repo: ## The repository to store your comments, make sure you're the repo's owner, e.g. imsun.github.io
  client_id: ## GitHub client ID, e.g. 75752dafe7907a897619
  client_secret: ## GitHub client secret, e.g. ec2fb9054972c891289640354993b662f4cccc50
gitalk:
  enable: false ## If you want to use Gitment comment system please set the value to true.
  owner:  ## Your GitHub ID, e.g. username
  repo:  ## The repository to store your comments, make sure you're the repo's owner, e.g. gitalk.github.io
  client_id:  ## GitHub client ID, e.g. 75752dafe7907a897619
  client_secret:  ## GitHub client secret, e.g. ec2fb9054972c891289640354993b662f4cccc50
  admin:  ## Github repo owner and collaborators, only these guys can initialize github issues.
valine: ## https://valine.js.org
  enable: false ## If you want to use Valine comment system, please set the value to true.
  appid: ## Your LeanCloud application App ID, e.g. pRBBL2JR4N7kLEGojrF0MsSs-gzGzoHsz
  appkey: ## Your LeanCloud application App Key, e.g. tjczHpDfhjYDSYddzymYK1JJ
  notify: false ## Mail notifier, see https://github.com/xCss/Valine/wiki/Valine-评论系统中的邮件提醒设置
  verify: false ## Validation code.
  placeholder: Just so so ## Comment box placeholders.
  avatar: 'mm' ## Gravatar type, see https://github.com/xCss/Valine/wiki/avatar-setting-for-valine
  pageSize: 10 ## Number of comments per page.
  guest_info: nick,mail,link ## Attributes of reviewers.

google_search: false ## Use Google search, true/false.
baidu_search: false ## Use Baidu search, true/false.
swiftype: ## Your swiftype_key, e.g. m7b11ZrsT8Me7gzApciT
tinysou: ## Your tinysou_key, e.g. 4ac092ad8d749fdc6293
self_search: true ## Use a jQuery-based local search engine, true/false.
google_analytics: ## Your Google Analytics tracking id, e.g. UA-42425684-2
baidu_analytics: ## Your Baidu Analytics tracking id, e.g. 8006843039519956000
show_category_count: true ## If you want to show the count of categories in the sidebar widget please set the value to true.
toc_number: true ## If you want to add list number to toc please set the value to true.
shareto: false ## If you want to use the share button please set the value to true, you must have hexo-helper-qrcode installed.
busuanzi: false ## If you want to use Busuanzi page views please set the value to true.
widgets_on_small_screens: true ## Set to true to enable widgets on small screens.
canvas_nest:
  enable: false ## If you want to use dynamic background please set the value to true, you can also fill the following parameters to customize the dynamic effect, or just leave them blank to keep the default effect.
  color: ## RGB value of the color, e.g. "100,99,98"
  opacity: ## Transparency of lines, e.g. "0.7"
  zIndex: ## The z-index property of the background, e.g. "-1"
  count: ## Quantity of lines, e.g. "150"
donate:
  enable: false ## If you want to show the donate button after each post, please set the value to true and fill the following items according to your need. You can also enable donate button in a page by adding a "donate: true" item to the front-matter.
  github: ## GitHub URL, e.g. https://github.com/Kaiyuan/donate-page
  alipay_qr: ## Path of Alipay QRcode image, e.g. /img/AliPayQR.png
  wechat_qr: ## Path of Wechat QRcode image, e.g. /img/WeChatQR.png
  btc_qr: ## Path of Bitcoin QRcode image, e.g. /img/BTCQR.png
  btc_key: ## Bitcoin key, e.g. 1KuK5eK2BLsqpsFVXXSBG5wbSAwZVadt6L
  paypal_url: ## Paypal URL, e.g. https://paypal.me/tufu9441

menu:
  - page: home
    directory: .
    icon: fa-home
  - page: archive
    directory: archives/
    icon: fa-archive
  - page: about
    directory: about/
    icon: fa-user
  - page: rss
    directory: atom.xml
    icon: fa-rss

widgets: ## Six widgets in sidebar provided: search, category, tag, recent_posts, rencent_comments and links.
  - search
  - category
  - tag
  - recent_posts
  - recent_comments
  # - links

links:
  - title: site-name1
    url: http://www.example1.com/
  - title: site-name2
    url: http://www.example2.com/
  - title: site-name3
    url: http://www.example3.com/

timeline:
  - num: 1
    word: 2014/06/12-Start
  - num: 2
    word: 2014/11/29-XXX
  - num: 3
    word: 2015/02/18-DDD
  - num: 4
    word: More

# Static files
js: js
css: css

# Theme version
version: 0.0.0
```