
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
