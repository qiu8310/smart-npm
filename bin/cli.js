#!/usr/bin/env node
'use strict';
var spawn = require('cross-spawn');
var parseArgs = require('../lib/parse-args');

var cmd = parseArgs(process.argv.slice(2));

var child = spawn(cmd.cmd, cmd.args, {
  env: process.env,
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
