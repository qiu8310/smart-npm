#!/usr/bin/env node
'use strict'
var spawn = require('cross-spawn')
var parse = require('../lib/parse-args')

var parsedArgs = parse(process.argv.slice(2))

var createChild = true // 是否新创建一个子程序
  // 扩展的一些命令
var extendSubCommands = {
  stats: 1,
  user: 1,
  check: 1
}

var subCmd = parsedArgs.rest.length && parsedArgs.rest[0]

if (subCmd && extendSubCommands[subCmd]) {
  createChild = false

  // 只有当子 bin 文件返回一个 true 才创建子程序，同时将 subCmd、--npm、 --registry 从 args 中剔除
  if (require('./' + subCmd)(parsedArgs) === true) {
    createChild = true
    parsedArgs.args = parsedArgs.args.filter(function(arg) {
      return arg !== subCmd && arg !== '--npm' && arg.indexOf('--registry') < 0
    })
  }
}

// 第二个参数是 "--registry=..."
if (parsedArgs.args.length === 2 && ['-v', '--version'].indexOf(parsedArgs.args[0]) >= 0) {
  if (parsedArgs.cmd === 'npm') {
    // 子命令中取不到系统的 alias
    // 所以虽然设置了 alias npm=smart-npm
    // 子命令中的 npm 还是原生的 npm（window 系统除外）
    spawn('npm', ['-v']).stdout
      .on('data', function(data) {
        outputVersions(data.toString().trim())
      })
  } else {
    outputVersions(require('npm/package.json').version)
  }
} else if (createChild) {
  var child = spawn(parsedArgs.cmd, parsedArgs.args, {
    env: parsedArgs.env,
    cwd: process.cwd(),
    stdio: [
      process.stdin,
      process.stdout,
      process.stderr
    ]
  })

  child.on('exit', function(code, signal) {
    process.exit(code)
  })
}

function outputVersions(npmVersion) {
  var smartVersion = require('../package.json').version
  console.log('       npm:  %s', npmVersion)
  console.log(' smart-npm:  %s', smartVersion)
}
