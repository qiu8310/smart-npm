var npmCmds = require('./npm-cmds');
var locateBin = require('./locate-bin');
var env = require('./env');

// 更新环境变量
Object.keys(process.env).forEach(function(key) {
  env[key] = process.env[key];
});

var OFFICIAL_REGISTRY = env.NPM_OFFICIAL_REGISTRY,
  MIRROR_REGISTRY = env.NPM_MIRROR_REGISTRY;

/**
 *
 * 解析 cli 的参数
 *
 *  - 如果命令中带有 `--registry`，则使用其指定的 registry ，如 `npm install jquery --registry=https://registry.npmjs.org`
 *  - 如果命令中带有 `--npm`， 则强制使用官方的 registry ， 如 `npm install jquery --npm`
 *  - 如果命令中不带有上面两个参数，则判断命令是否是 {@link npm-cmds} 中的一个，是的话用官方的 registry ，否则使用中国镜像的 registry
 *
 *
 * @alias parse-args
 * @param {Array} args - cli 的参数，一般是 process.argv.slice(2)
 * @returns {Object}
 */
module.exports = function(args) {

  var cmd = locateBin('npm'),
    registry = MIRROR_REGISTRY,
    rest = [],
    reWord = /^[\w-]+$/;

  args = args.filter(function(arg) {
    if (arg === '--npm') {
      registry = OFFICIAL_REGISTRY;
      return false;
    }

    if (arg && arg[0] !== '-' && reWord.test(arg)) {
      rest.push(arg);
    }

    return true;
  });

  if (rest.length && npmCmds.indexOf(rest[0]) >= 0) {
    registry = OFFICIAL_REGISTRY;
  }

  // 命令中没有 `--registry` 选项才加上默认的
  if (args.join('|').indexOf('--registry') < 0) {
    args.push('--registry=' + registry);
  }

  return {
    env: registry !== OFFICIAL_REGISTRY ? env : process.env,
    cmd: cmd,
    rest: rest, // rest 可能为空的 数组
    args: args
  };
};

