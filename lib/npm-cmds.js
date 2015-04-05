/**
 * 所有需要使用 npm 的子命令
 *
 * 本程序将 `npm` 的子命令分成三大类（不是很精确）：
 *
 * * 需要去 registry 上修改或添加信息的命令（此模块返回的就是此类子命令）
 *
 *  - `acccess`: 修改 package 的访问权限
 *  - `adduser`: 注册用户
 *  - `config`, `c`, `set`, `get`: 配置相关，`cnpm` 有它自己独立的配置文件，所以这些命令都是修改 `npm` 配置文件的，而不是 `cnpm` 的配置文件
 *  - `deprecate`: 标识某个版本已经废弃了，在用户安装是会得到提醒
 *  - `dist-tag`: 修改 package tag 相关
 *  - `owner`: package 拥有者相关
 *  - `star`, `unstar`: star or unstar a package
 *  - `publish`, `unpublish`: 发布或者取消发布某一个版本
 *
 *
 * * 需要去 registry 上查询信息的命令
 *
 *  _说明：`cnpm` 模块默认提供了 `web`, `search`, `check`, `doc`, `user`, `sync` 六个子命令，这些命令作用感觉都不是很大，一般用不到，除了 `sync` 外，都可以用 `npm` 原生的替换_
 *
 *  - `web`: `cnpm` 提供，跳转到 `cnpm` 主页 —— [http://npm.taobao.org/](http://npm.taobao.org/)
 *  - `search`: `cnpm` 和 `npm` 都提供了，用 `cnpm` 的话是跳到对应的[搜索页](http://npm.taobao.org/browse/keyword/jquery)，用 `npm` 的话是在当前命令行中出现搜索结果
 *  - `check`: `cnpm` 提供，检查当前 package 所依赖的 packages 中是否有过期的，__推荐使用 `npm outdated` __
 *  - `doc`: `cnpm` 提供，跳转到指定 package 的 `cnpm` 的主页，__推荐使用 `npm home [package]` 或 `npm repo [package]` 替换
 *  - `sync`: `cnpm` 提供，手动触发 `cnpm` 去 `npm` 上同步指定的 package，默认的 `cnpm` 是每10分钟同步一次
 *  - `user`: `cnpm` 提供，跳转到 package 的作者的 `cnpm` 的主页
 *  - `home`, `docs`: 跳转到 package 的主页
 *  - `repo`: 跳转到 package 的 repo 的主页（如是有定义 repo 的话）
 *  - `dedupe`, `ddp`: 减少重复依赖的模块
 *  - `install`, `i`: 安装 package
 *  - `list`, `ls`, `la`, `ll`: 输出依赖树
 *  - `bugs`: 分析 package.json 文件，打开 bugs 所对应的网站
 *  - `outdated`: 检查当前 package 所依赖的 packages 中是否有过期的
 *  - `update`: 更新 package
 *  - `info`, `view`, `v`: 查看 package 的详细信息
 *  - `help`: 输出帮助信息
 *
 * * 不需要去 registry 上操作的命令，即一般操作本地资源
 *
 *  _这里就不一一列出了，除了上面两类，都是属于这类，详情可以去[官网查看](https://docs.npmjs.com/cli/access)_
 *
 * @alias npm-cmds
 * @type {String[]}
 */

module.exports = [
  'acccess',
  'adduser',
  'config', 'c', 'get', 'set',
  'deprecate',
  'dist-tag',
  'owner',
  'star', 'unstar',
  'publish', 'unpublish'
];
