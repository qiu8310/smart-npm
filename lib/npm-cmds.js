/**
 * 所有需要使用 npm 的子命令
 *
 *
 * * <a name="npm">需要去 registry 上修改或添加信息的命令，只能使用官方的 registry （有待更新）</a>
 *
 *  - `acccess`: 修改 package 的访问权限
 *  - `adduser`, `add-user`: 注册用户
 *  - `login`, `logout`: 登录和登出
 *  - `config`, `c`, `set`, `get`: 配置相关
 *  - `deprecate`: 标识某个版本已经废弃了，在用户安装是会得到提醒
 *  - `dist-tag`: 修改 package tag 相关
 *  - `owner`: package 拥有者相关
 *  - `star`, `unstar`: star or unstar a package
 *  - `publish`, `unpublish`: 发布或者取消发布某一个版本
 *
 *  _更多其它子命令可以去[官网查看](https://docs.npmjs.com/cli/access)_
 *
 * @alias npm-cmds
 * @type {String[]}
 */

module.exports = [
  'acccess',
  'adduser', 'add-user',
  'whoami',
  'login', 'logout',
  'config', 'c', 'get', 'set',
  'deprecate',
  'dist-tag',
  'owner',
  'search',
  'star', 'unstar',
  'publish', 'unpublish'
];
