var locateBin = require('../lib/locate-bin');

/**
 *
 * 调用子模块 {@link https://github.com/dylang/npm-check npm-check}
 *
 * 检查是否存在过期的，不正确的以及没有使用的依赖包，同时支持自动更新依赖包
 *
 */

module.exports = function(parsedArgs) {
  parsedArgs.cmd = locateBin('npm-check');
  return true;
};
