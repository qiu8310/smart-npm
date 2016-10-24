
3.0.0 / 2016-10-24
==================

  * 使用 eslint，去除 gulp
  * 不再自动替换原生的 npm，需手动替换
  * Merge pull request #8 from qiu8310/snyk-fix-93286977
  * fix: package.json & .snyk to reduce vulnerabilities

2.0.2 / 2016-05-05
==================

  * fix: 安装失败出一个友好的提醒
  * docs: update install tip for window user
  * fix: update node mirror env name
  * fix lint

2.0.0 / 2016-04-27
==================

 * alpha 版本在 uninstall 会报错，此版引入额外的先置命令来删除 smart-npm
 * 执行 npm -v 或 npm --version 同时也会输入 smart-npm 的版本


2.0.0-alpha / 2016-04-27
========================
  
 * 由于 npm 升级，导致无法在 scripts 中覆盖原来的 npm，需要 postinstall 脚本实现
 * 更新 README，同时更新部分文案错误


1.2.4 / 2016-01-26
==================

  * 更新淘宝镜像到 https
  * add appveyor.yml

1.2.3 / 2015-11-03
==================

  * 添加 electron 和 node-sass 的镜像
  * add 'search' to native npm cmd
  * whoami 命令需要走官方的 registry
  * 更新本地安装了 smart-npm 运行 npm test 失败的问题
  * 更新几个非常有用的 alias 脚本

1.2.1 / 2015-04-19
==================

  * Set npm version to latest

1.2.0 / 2015-04-18
==================

  * 去掉自动处理 npm 的替换问题

1.1.0 / 2015-04-18
==================

  * Update npm from 2.7 to 2.8

1.0.1 / 2015-04-10
==================

 * 修复 Unix 平台本地安装会删除原 npm 文件的问题
 * 还有两个问题有待解决，本地 `npm link` 无法安装，window 下本地安装还是不行 


1.0.0 / 2015-04-08
==================

  * 去掉了 `cnpm` 模块： `cnpm` 很多命令和 `npm` 冲突了，同时有些选项在 `cnpm` 上会报错（比如 `cnpm -g root`）
  * 添加了三个扩展命令
    
    - `npm user {user_nmae}`：查看用户的个人主页
    - `npm check`：检查当前项目的依赖是否过期了，并且可以自动更新依赖到最新版
    - `npm stats {package}`：查看指定项目的统计数据，包括下载次数，被依赖次数，下载趋势等等    



0.1.0 / 2015-04-06
==================

  * Save original npm, when you uninstall, oritinal npm will back


0.0.7 / 2015-04-06
==================

  * Return npm version when use -v or --version
  * Add install script and rewrite README.md


0.0.6 / 2015-04-06
==================

  * Fix travis build error
  * disable taobao registry when in CI environment


0.0.4 / 2015-04-06
==================

  * Add release and unrelease script


0.0.3 / 2015-04-06
==================

  * Update cnpm to 3.0.1
  * Add `login`, `version` to `npm` command


0.0.2 / 2015-04-05
==================

  * Fix recycle call npm bug
  * Unpublish 0.0.1

0.0.1 / 2015-04-05
==================

  *  Initial version
