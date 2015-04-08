#!/usr/bin/env node
'use strict';
var spawn = require('cross-spawn');
var parse = require('../lib/parse-args');

var parsedArgs = parse(process.argv.slice(2));

var createChild = true, // 是否新创建一个子程序
  // 扩展的一些命令
  extendSubCommands = {
    stats: 1,
    user: 1,
    check: 1
  };

var subCmd = parsedArgs.rest.length && parsedArgs.rest[0];

if (subCmd && extendSubCommands[subCmd]) {
  createChild = false;

  // 只有当子 bin 文件返回一个 true 才创建子程序，同时将 subCmd、--npm、 --registry 从 args 中剔除
  if (require('./' + subCmd)(parsedArgs) === true) {
    createChild = true;
    parsedArgs.args = parsedArgs.args.filter(function(arg) {
      return arg !== subCmd && arg !== '--npm' && arg.indexOf('--registry') < 0;
    });
  }
}

if (createChild) {
  var child = spawn(parsedArgs.cmd, parsedArgs.args, {
    env: parsedArgs.env,
    cwd: process.cwd(),
    stdio: [
      process.stdin,
      process.stdout,
      process.stderr
    ]
  });

  child.on('exit', function (code, signal) {
    process.exit(code);
  });
}
