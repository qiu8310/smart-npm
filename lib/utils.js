var _open = require('open');
var utils = {};

/**
 * utils 组件
 *
 * @module utils
 * @type {Object}
 */
module.exports = utils;

/**
 * 用浏览器打开一个链接，参考自 {@link https://github.com/cnpm/cnpm/blob/3.0.1/utils.js#L20-31 CNPM}
 *
 * @param {String} url
 */
utils.openurl = function (url) {
  _open(url, function (err, stdout, stderr) {
    if (err) {
      console.log('Can not open browser, please open your browser to visit: ' + url);
      process.exit(0);
    }

    if (stdout || stderr) {
      console.log(stdout, stderr);
    }
    process.exit(0);
  });
};
