# smart-npm
[![NPM version](https://badge.fury.io/js/smart-npm.svg)](https://npmjs.org/package/smart-npm)
[![GitHub version][git-tag-image]][project-url]
[![Build Status][travis-image]][travis-url]
[![Dependency Status][daviddm-url]][daviddm-image]
[![Inline docs][doc-image]][doc-url]
[![Coverage Status][coveralls-image]][coveralls-url]


智能的 `npm`，让你在中国使用 `npm` 时，下载速度更快，使用更方便！


[jsdoc 生成的文档](http://qiu8310.github.io/smart-npm)

[github 地址](https://github.com/qiu8310/smart-npm)


## 背景

> 用 [`npm`][npm] 时，默认它会访问国外资源，所以会非常卡，有时甚至会被墙。现在市面上一般有三种解决方案：
>
> 1. 在 `.npmrc` 上配置一个国内的 registry 镜像
>
> 2. 使用 [`cnpm`](https://npm.taobao.org/)
>
> 3. 使用 VPN


* 第1个方案很粗暴，可以解决很多下载慢的问题，但是当你用 `npm publish` 时就会失败

* 第2个方案不错，但这样你就又会遇到问题，到底哪些命令需要用 `cnpm`，哪些命令需要用 `npm` 呢？

* VPN 方案有时也不能百分百解决问题，有时有些 VPN 也不稳定，但有个 VPN 很保险就是


> 其实 `cnpm` 的意图并不是简单给我们用来去下载 `npm` 资源的，它是为 [cnpm 服务端（也可以理解成 npm 的私有仓库）][cnpm-s]服务的。所以你如果简单的把
> `cnpm` 当作 `npm` 来用会有出现很多问题（[见下](https://github.com/qiu8310/smart-npm/#%E6%8A%8A-cnpm-%E5%BD%93%E4%BD%9C-npm-%E6%9D%A5%E7%94%A8%E6%97%B6%E4%BC%9A%E5%87%BA%E7%8E%B0%E7%9A%84%E9%97%AE%E9%A2%98)）。



__所以，我们就需要一个更智能的 `npm` 了，可以在我们使用 `npm install` 时自动从国内的镜像下载，而在我们使用 `npm publish` 又能发布到官方的 registry 上！__


###  就让 `smart-npm` 来为你完成吧！



## 安装
 
__windows 用户安装后，体验没有原生的好，因为每次运行都会创建一个子程序，所以请慎装！__ 

```
npm install --global smart-npm --registry=https://registry.npm.taobao.org/
```

安装成功后默认会在你的 `npm` 用户配置文件 `~/.npmrc` 中添加淘宝的 registry。

## 使用

* 安装后系统的 `npm` 会被替换了，如你要使用原生的 `npm` 命令，可以用 `npm-original` 代替。

* 新的 `npm` 包含了`原生的 npm` 和 `cnpm` 两个模块，在你使用 `publish`, `config`, `adduser`, `star` 等（[click here to see more][npm-cmds]）
  命令时，默认使用`原生的 npm`，并且自动会在命令上添加 `--registry=https://registry.npmjs.org`（防止被你的配置文件中的 registry 影响）；
  当你使用其它命令时，都会使用 `cnpm` 模块。

  - 如果要强制使用某个 registry 时，只要在命令后面添加 registry 参数即可，比如，
    `npm install jquery --registry=https://r.cnpmjs.org` 就会使用你指定的 registry 去拉取 `jquery`
    
  - 如果要强制使用 `npm` 或者 `cnpm`，只要在命令后面加上 `--npm` 或者 `--cnpm`，
    比如， `npm install jquery --npm` 就会强制使用 `npm` 模块去安装 `jquery`，而不是 `cnpm`


### 比较有用但很少被用的一些 `npm` 或者 `cnpm` 的命令

* __`npm repo {project_name}`__ ： 用浏览器打开 project_name 的 github 地址（前提是此 project 的 package.json 文件中有设置 `repository`）

* __`npm home {project_name}`__ ： 用浏览器打开 project_name 的首页（前提是此 project 的 package.json 文件中有设置 `homepage`）

* __`npm user {user_name}`__：`cnpm`的功能，用浏览器打开用户在淘宝镜像的主页，如 `https://npm.taobao.org/~{user_name}`

* __`npm view {project_name} versions`__：查看 project_name 的所有版本号（只会显示版本号，不显示其它信息）

* __`npm outdated`__：检查当前项目所依赖的 packages 是否有最新的版本可以更新

## 卸载

```
npm uninstall --global smart-npm
```

卸载会恢复原来的 `npm`



## 原理

1. 此包只是对 `npm` 和 `cnpm` 的一个简单封装，它能自动根据你使用的子命令判断使用 `npm` 还是 `cnpm`。
  判断的主要依据是根据所要执行的子命令是否需要去 `registry` 上修改或添加信息。因为一般的镜像是只支持读取
  信息，而不支持修改或添加信息的。所以，如果子命令（像 `publish`、`adduser` 等）需要去修改或添加信息就会使用 `npm`，
  而如果子命令（像 `install`、`info` 行）只是读取信息，则会使用 `cnpm`。

2. 安装上包之后，你的 `~/.npmrc` 中会多一个淘宝的 registry，主要解决很多开源的 package 会根据此处的 registry 去获取其所要获取的
  package 的信息。
  
  _可能有人会问，既然这里添加了一个 registry，那么在用 `npm publish` 的时候不也会用这个 registry 吗？_
  
  不会的，因为在你用 `npm publish` 的时候， `smart-npm` 自动帮你在命令后面加上了 `--registry=https://registry.npmjs.org`




## 把 cnpm 当作 npm 来用时会出现的问题

1. `publish`, `adduser`, `login` （[_Click here to see more_][npm-cmds]）
  等命令无法通过 `cnpm` 来执行，即运行 `cnpm publish` 来发布一个版本会失败的

2. 某此命令在 `cnpm` 和 `npm` 上表现完全不一样，如 `cnpm version`：显示当前 `cnpm 版本号`； 而 `npm version`：是可以修改当前 package 的版本号的

3. 有很多 `npm` 包都集成了 `npm install`，比如 [yeoman][yeoman] 的所有 `generators` ，在最后基本都会
  调用 `npm install`，（[_可以看其源码_](https://github.com/yeoman/generator/blob/v0.18.10/lib/actions/install.js#L147-159)）
  这种情况下使用 `cnpm` 完全无效，必须中断操作，然后自己手动运行 `cnpm install`，或者在运行 `yo [generator]` 时就指定 `--skip-install`，
  这体验就很不爽了
   
4. 还有一种情况是，很多和 `npm` API 相关的 package，都会读取 `~/.npmrc` 中的 registry，或者使用默认的 registry —— [https://registry.npmjs.org/][npm-registry]，
  去查询 npm package 相关的信息，比如下面这些：
  
    - [npm-latest](http://cnpmjs.org/package/npm-latest): 查询某个 package 的最新版本号
    - [npm-name](http://cnpmjs.org/package/npm-name): 查询某个 package name 是否被注册了
    - [npm-dependents](https://npm.taobao.org/package/npm-dependents): 查找某个模块所依赖的其它所有模块
    - ...
  
  如果你用的任何一个包或其所依赖的包中用了这些 package，那么在这些包请求网络时也得慢死了！


## 调试

#### 调试 npm

__--loglevel__ 

- silent: completely silent. Zero logging output.
- win: Just the “npm ok” or “npm not ok” message at the end.
- error: When something unexpected and bad happens.
- warn: When something odd or potentially dangerous is happening.
- info: Helpful information so you can track what’s happening.
- verbose: Even more. Perhaps just a wee bit obnoxious, even.
- silly: Completely fuckin crazy, man. Dump everything. Whole objects, you name it, whatever.

__特定 loglevel 的缩写信息__

- s :       ["--loglevel", "silent"]
- d :       ["--loglevel", "info"]
- dd :      ["--loglevel", "verbose"]
- ddd :     ["--loglevel", "silly"]
- silent :  ["--loglevel", "silent"]
- verbose : ["--loglevel", "verbose"]
- quiet:    ["--loglevel", "warn"]
- q:        ["--loglevel", "warn"]

#### 调试 cnpm

加上环境变量 `DEBUG=cnpm,cnpm:origin`


## Todo List

* npm 和 cnpm 的帮助混合在一起，比较乱，整理一个比较全面的帮助文档
* 本地安装也会替代了全局的 `npm`


## Reference

- [npm 官网][npm]
- [所有 npm 支持的子命令](https://docs.npmjs.com/cli/access)
- [cnpm server][cnpm-s]
- [cnpm client][cnpm]


# Release History

[Changelog](CHANGELOG.md)




## License

Copyright (c) 2015 Zhonglei Qiu. Licensed under the MIT license.


[yeoman]: http://yeoman.io/
[npm]: https://npmjs.org/
[cnpm-s]: https://github.com/cnpm/cnpmjs.org
[cnpm]: https://github.com/cnpm/cnpm/
[npm-registry]: https://registry.npmjs.org/

[npm-cmds]: http://qiu8310.github.io/smart-npm/global.html#npm
[cnpm-cmds]: http://qiu8310.github.io/smart-npm/global.html#cnpm

[doc-url]: http://inch-ci.org/github/qiu8310/smart-npm
[doc-image]: http://inch-ci.org/github/qiu8310/smart-npm.svg?branch=master
[project-url]: https://github.com/qiu8310/smart-npm
[git-tag-image]: http://img.shields.io/github/tag/qiu8310/smart-npm.svg
[travis-url]: https://travis-ci.org/qiu8310/smart-npm
[travis-image]: https://travis-ci.org/qiu8310/smart-npm.svg?branch=master
[daviddm-url]: https://david-dm.org/qiu8310/smart-npm.svg?theme=shields.io
[daviddm-image]: https://david-dm.org/qiu8310/smart-npm
[coveralls-url]: https://coveralls.io/r/qiu8310/smart-npm
[coveralls-image]: https://coveralls.io/repos/qiu8310/smart-npm/badge.png

