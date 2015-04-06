'use strict';
var path = require('path');
var spawn = require('cross-spawn');
var assert = require('should');

var parseArgs = require('../lib/parse-args');
var npmCmds = require('../lib/npm-cmds');

var root = path.resolve(path.dirname(__dirname));

describe('smartNpm', function () {

  function findNodeModuleBin(module, bin) {
    var main = require.resolve(module);
    var parts = main.split(path.sep);
    bin = bin || module;
    var ref = parts.pop();
    while (ref && (module !== ref || parts[parts.length - 1] !== 'node_modules')) {
      ref = parts.pop();
    }
    return path.join(parts.join(path.sep), '.bin', bin);
  }

  var cnpmCmd = findNodeModuleBin('cnpm'),
    npmCmd = findNodeModuleBin('npm'),
    cnpmSubCmd = 'install',
    npmSubCmd = npmCmds[0],
    npmRegistry = '--registry=https://registry.npmjs.org/';

  context('registry', function() {
    it('should add npm registry to arguments when use npm sub cmd', function() {
      assert.deepEqual(parseArgs([npmSubCmd]), {cmd: npmCmd, args: [npmSubCmd, npmRegistry]});
    });

    it('should not add npm registry to arguments when use cnpm sub cmd', function() {
      assert.deepEqual(parseArgs([cnpmSubCmd]), {cmd: cnpmCmd, args: [cnpmSubCmd]});
    });

    it('should not add npm registry to arguments when user arguments already have a registry', function() {
      var registry = '--registry=xx';
      assert.deepEqual(parseArgs([npmSubCmd, registry]), {cmd: npmCmd, args: [npmSubCmd, registry]});
      assert.deepEqual(parseArgs([cnpmSubCmd, registry]), {cmd: cnpmCmd, args: [cnpmSubCmd, registry]});
    });
  });

  context('cmd', function() {
    it('should use cnpm cmd if no arguments', function () {
      assert.deepEqual(parseArgs([]), {cmd: cnpmCmd, args: []});
    });

    it('should use cnpm cmd if sub cmd not defined in file `lib/npm-cmd.js`', function() {
      assert.deepEqual(parseArgs([cnpmSubCmd]), {cmd: cnpmCmd, args: [cnpmSubCmd]});
    });

    it('should use npm cmd if sub cmd defined in file `lib/npm-cmd.js`', function() {
      npmCmds.forEach(function(cmd) {
        assert.deepEqual(parseArgs([cmd]), {cmd: npmCmd, args: [cmd, npmRegistry]});
      });
    });

    it('should use forced use npm cmd when arguments have a param `--npm`', function() {
      assert.deepEqual(parseArgs([cnpmSubCmd, '--npm']), {cmd: npmCmd, args: [cnpmSubCmd, npmRegistry]});
      assert.deepEqual(parseArgs([npmSubCmd, '--npm']), {cmd: npmCmd, args: [npmSubCmd, npmRegistry]});
    });

    it('should use forced use cnpm cmd when arguments have a param `--cnpm`', function() {
      assert.deepEqual(parseArgs([cnpmSubCmd, '--cnpm']), {cmd: cnpmCmd, args: [cnpmSubCmd]});
      assert.deepEqual(parseArgs([npmSubCmd, '--cnpm']), {cmd: cnpmCmd, args: [npmSubCmd]});
    });
  });

  context('arguments', function() {
    it('should pass user arguments to returned arguments', function() {
      var userArgs = ['-a', '--bd=xxx', '-c', '--de'];
      assert.deepEqual(parseArgs([npmSubCmd].concat(userArgs)).args, [npmSubCmd].concat(userArgs, npmRegistry));
      assert.deepEqual(parseArgs(userArgs.concat(npmSubCmd)).args, userArgs.concat(npmSubCmd, npmRegistry));

      assert.deepEqual(parseArgs([cnpmSubCmd].concat(userArgs)).args, [cnpmSubCmd].concat(userArgs));
      assert.deepEqual(parseArgs(userArgs.concat(cnpmSubCmd)).args, userArgs.concat(cnpmSubCmd));
    })
  });

  context('cli', function() {
    var npm = path.join(root, 'bin', 'cli.js');
    function run(args, cb) {
      var stdout = '';
      function handler(status, singal) {
        cb(status, stdout, singal);
      }

      if (process.env.CI) {
        args.push('--registry=https://registry.npmjs.org/');
      }

      var child = spawn(npm, args).on('exit', handler);

      child.stdout.on('data', function (data) {
        stdout += data.toString();
      });
    }

    it('should install package `x-path` successfully', function(done) {
      this.timeout(10000);
      // remove package before install
      run(['uninstall', 'x-path'], function() {
        run(['i', 'x-path'], function(status) {
          status.should.eql(0);
          done();
        });
      });
    });

    it('should get package `x-path`\'s info successfully', function(done) {
      this.timeout(10000);
      run(['info', 'x-path'], function(status, content) {
        status.should.eql(0);
        content.should.match(/name:\s*['"]x-path['"]/);
        done();
      });
    });

  });
});
