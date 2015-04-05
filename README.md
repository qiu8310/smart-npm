# smart-npm
[![NPM version](https://badge.fury.io/js/smart-npm.svg)](https://npmjs.org/package/smart-npm)
[![GitHub version][git-tag-image]][project-url]
[![Build Status][travis-image]][travis-url]
[![Dependency Status][daviddm-url]][daviddm-image]
[![Inline docs][doc-image]][doc-url]
[![Coverage Status][coveralls-image]][coveralls-url]


根据你的 npm 命令自动切换 registry. 

[jsdoc 生成的文档](http://qiu8310.github.io/smart-npm)

[github 地址](https://github.com/qiu8310/smart-npm)


## 背景

在中国，要下载 [npm][npm] 包非常慢，如果使用 [cnpm][cnpm] 下载包就非常快了，感觉很爽，但是 `cnpm` 也有几个大问题：

1. `cnpm` 的仓库只是 `npm` 仓库的一个拷贝，它不承担 `publish` 工作，所以你[用 `cnpm publish` 命令会执行失败的](https://github.com/cnpm/cnpm/issues/23#issuecomment-87561615)

2. 不仅是 `publish` 会执行失败，其它的需要注册用户(`npm adduser`)、或者[修改 package 状态等命令](http://qiu8310.github.io/smart-npm/global.html#npm-cmds)都无法用 `cnpm` 

3. 有很多 `npm` 包都集成了 `npm install`，比如 [yeoman][yeoman] 的所有 `generators` ，在最后基本都会
  调用 `npm install`，可以看其[源码](https://github.com/yeoman/generator/blob/v0.18.10/lib/actions/install.js#L147-159)，
  这种情况下使用 `cnpm` 完全无效，必须中断操作，然后自己手动运行 `cnpm install`，或者在运行 `yo [generator]` 时就指定 `--skip-install`，
  这体验就很不爽了

4. 还有一种情况是，很多和 `npm` API 相关的 package，都会读取 `~/.npmrc` 中的 registry，或者使用默认的 registry —— [https://registry.npmjs.org/][npm-registry]，
  去查询 npm package 相关的信息，比如下面这些：
  
  	- [npm-latest](http://cnpmjs.org/package/npm-latest): 查询某个 package 的最新版本号
  	- [npm-name](http://cnpmjs.org/package/npm-name): 查询某个 package name 是否被注册了
  	- [npm-dependents](https://npm.taobao.org/package/npm-dependents): 查找某个模块所依赖的其它所有模块
  	- ...
  
  如果你用的任何一个包或其所依赖的包中用了这些 package，那么在这些包请求网络时也得慢死了！
  
## 安装

1. 安装 `smart-npm`: `npm install --global smart-npm`
2. 在 `~/.npmrc` 上添加淘宝的 registry: `registry=https://registry.npm.taobao.org/`  

## 原理

此包只是对 `npm` 和 `cnpm` 的一个简单封装，同时替换默认的 `npm` 命令，它能自动根据你使用的子命令判断使用 `npm` 还是 `cnpm`。
判断的主要依据是根据所要执行的子命令是否需要去 `registry` 上修改或添加信息，是的话就只能使用 `npm`，
（对于这些走 `npm` 路径的命令，如果没有指定 registry ，默认都会加上官方的 registry）
否则统一走 `cnpm` 路线，这么一来就解决了上面提到的 `1`，`2`，`3` 这三个问题。

对于第 `4` 个问题，解决办法就是将 `.npmrc` 中的 registry 改成淘宝的 registry，这样的话对于那些使用 `~/.npmrc` 中的 registry
的 packages，它们就会定位到淘宝的 registry 上，所以访问速度也会非常快。
（注意：这些 packages 一般都只是去获取信息，并不会去更改或添加信息，所以它们用淘宝的 registry 是没问题的）


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


## Roadmap

* npm 和 cnpm 的帮助混合在一起，比较乱，整理一个比较全面的帮助文档
* 将 npm 的 man doc 引入进 smart-npm


## Reference

- [npm 官网][npm]
- [所有 npm 支持的子命令](https://docs.npmjs.com/cli/access)
- [cnpm 官网][cnpm]



## License

Copyright (c) 2015 Zhonglei Qiu. Licensed under the MIT license.


[yeoman]: http://yeoman.io/
[npm]: https://npmjs.org/
[cnpm]: http://cnpmjs.org/
[npm-registry]: https://registry.npmjs.org/

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

