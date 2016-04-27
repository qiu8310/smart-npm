
var mirrorsUrl = 'https://npm.taobao.org/mirrors';

/**
 *
 * 环境变量的配置，可以在你的系统的环境变量中配置同名的 key，以将这些默认的值覆盖
 *
 * 各项配置解释：
 *
 * - _`NPM_OFFICIAL_REGISTRY`_: 官方 registry 注册地址，默认值 `https://registry.npmjs.org/`
 * - _`NPM_MIRROR_REGISTRY`_:   国内的 npm registry 镜像，默认值 `https://registry.npm.taobao.org/`
 * - _`NVM_NODEJS_ORG_MIRROR`_: node 安装包下载地址，默认值 `https://npm.taobao.org/mirrors/node`
 * - _`NVM_IOJS_ORG_MIRROR`_:   iojs 安装包的下载地址，默认值 `https://npm.taobao.org/mirrors/iojs`
 * - _`PHANTOMJS_CDNURL`_:      phantomjs 安装包的下载地址，默认值 `https://npm.taobao.org/mirrors/phantomjs`
 * - _`CHROMEDRIVER_CDNURL`_:   chrome driver 安装包的下载地址，默认值 `https://npm.taobao.org/mirrors/chromedriver`
 * - _`SELENIUM_CDNURL`_:       selenium 安装包的下载地址，默认值 `https://npm.taobao.org/mirrors/selenium`
 *
 * @alias env
 * @type {Object}
 */
module.exports = {
  NPM_OFFICIAL_REGISTRY: 'https://registry.npmjs.org/',
  NPM_MIRROR_REGISTRY: 'https://registry.npm.taobao.org/',

  NVM_NODEJS_ORG_MIRROR:  mirrorsUrl + '/node',
  NVM_IOJS_ORG_MIRROR:    mirrorsUrl + '/iojs',
  PHANTOMJS_CDNURL:       mirrorsUrl + '/phantomjs',
  CHROMEDRIVER_CDNURL:    mirrorsUrl + '/chromedriver',
  SELENIUM_CDNURL:        mirrorsUrl + '/selenium',
  ELECTRON_MIRROR:        mirrorsUrl + '/electron/',
  SASS_BINARY_SITE:       mirrorsUrl + '/node-sass'
};
