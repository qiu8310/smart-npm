var path = require('path');

var npmCmds = require('../lib/npm-cmds');
var binDir = path.join(path.dirname(__dirname), 'node_modules', '.bin');

/**
 *
 * 解析 cli 的参数，如果子命令是 {@link npm-cmds} 中的一个，则使用 `npm` 命令，否则使用 `cnpm`；除非：
 *
 *  - 如果参数中带有 `--npm`， 则强制使用原生的 `npm` 命令，并删除参数 `--cnpm`
 *  - 如果参数中带有 `--cnpm`， 则强制使用原生的 `cnpm` 命令，并删除参数 `--cnpm`
 *
 *  __另外要注意的是：当使用 `npm` 命令时，如果没用加上 registry，则默认会加上 `npm` 默认的 [registry](https://registry.npmjs.org/)__
 *
 * @alias parse-args
 * @param {Array} args - cli 的参数，经常是 process.argv.slice(2)
 * @returns {{cmd: String, args: Array}}
 */
module.exports = function(args) {

  var cmd,
    subCmd,
    force = null;

  args = args.filter(function(arg) {
    if (arg === '--npm' || arg === '--cnpm') {
      force = arg.substr(2);
      return false;
    }

    if (!subCmd && arg && arg[0] !== '-') {
      subCmd = arg;
    }

    return true;
  });

  if (force !== 'cnpm' && (npmCmds.indexOf(subCmd) >= 0 || force === 'npm')) {
    cmd = path.join(binDir, 'npm');

    if (args.join('|').indexOf('--registry') < 0) {
      args.push('--registry=https://registry.npmjs.org/');
    }
  } else {
    cmd = path.join(binDir, 'cnpm');
  }

  return {
    cmd: cmd,
    args: args
  };
};

