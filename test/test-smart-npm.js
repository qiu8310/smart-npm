'use strict';
var path = require('path');
var spawn = require('cross-spawn');
var assert = require('should');

var locateBin = require('../lib/locate-bin');
var parseArgs = require('../lib/parse-args');
var env = require('../lib/env');
var npmCmds = require('../lib/npm-cmds');

var root = path.resolve(path.dirname(__dirname));

describe('smartNpm', function () {

  var npmCmd = locateBin('npm'),
    npmSubCmd = npmCmds[0],
    noNpmSubCmd = 'install',
    mirrorRegistry = '--registry=' + env.NPM_MIRROR_REGISTRY,
    officialRegistry = '--registry=' + env.NPM_OFFICIAL_REGISTRY;

  context('npmCmds', function() {
    it('should be a Array and not empty', function() {
      npmCmds.should.be.an.Array;
      assert.ok(npmCmds.length);
    });
  });

  context('env', function() {
    it('should be a Object and not empty', function() {
      env.should.be.an.Object;
      assert.ok(Object.keys(env).length);
    });
    it('should added to the process.env after parse-args with no official registry', function() {
      parseArgs([noNpmSubCmd]).env.should.containEql(env);
    });
    it('should not added to the process.env after parse-args with official registry', function() {
      parseArgs([npmSubCmd]).env.should.not.containEql(env);
    });
  });

  context('arguments', function() {
    it('should pass user arguments to returned arguments', function() {
      var userArgs = ['-a', '--bd=xxx', '-c', '--de'];

      parseArgs([npmSubCmd].concat(userArgs)).args.should.containDeep(userArgs);
      parseArgs(userArgs.concat(npmSubCmd)).args.should.containDeep(userArgs);

      parseArgs([noNpmSubCmd].concat(userArgs)).args.should.containDeep(userArgs);
      parseArgs(userArgs.concat(noNpmSubCmd)).args.should.containDeep(userArgs);
    });
  });

  context('parse-args basic', function() {
    it('should return object with four keys on it', function() {
      var ret = parseArgs([npmSubCmd]);
      Object.keys(ret).should.has.a.length(4);
      Object.keys(ret).should.containDeep(['cmd', 'rest', 'env', 'args']);
    });

    it('should always use local npm bin', function() {
      parseArgs([npmSubCmd]).should.containEql({cmd: npmCmd});
      parseArgs([noNpmSubCmd]).should.containEql({cmd: npmCmd});
    });
  });

  context('registry', function() {
    it('should use mirror registry if sub cmd not defined in file `lib/npm-cmd.js`', function() {
      parseArgs([noNpmSubCmd]).args.should.containEql(mirrorRegistry);
      parseArgs([noNpmSubCmd, 'others', '-a']).args.should.containEql(mirrorRegistry);
    });

    it('should use official registry if sub cmd defined in file `lib/npm-cmd.js`', function() {
      npmCmds.forEach(function(cmd) {
        parseArgs([cmd]).args.should.containEql(officialRegistry);
        parseArgs([cmd, '-a', 'a']).args.should.containEql(officialRegistry);
      });
    });

    it('should force use official registry when arguments have a param `--npm`', function() {
      parseArgs([noNpmSubCmd, '--npm']).args.should.containEql(officialRegistry);
      parseArgs([npmSubCmd, '--npm']).args.should.containEql(officialRegistry);
    });

    it('should not use official or mirror registry when arguments already have a registry', function() {
      var registry = '--registry=xx';
      parseArgs([npmSubCmd, registry]).args.should.not.containEql(officialRegistry);
      parseArgs([npmSubCmd, registry]).args.should.not.containEql(mirrorRegistry);
      parseArgs([noNpmSubCmd, registry]).args.should.not.containEql(officialRegistry);
      parseArgs([noNpmSubCmd, registry]).args.should.not.containEql(mirrorRegistry);

      parseArgs([npmSubCmd, registry]).args.should.containEql(registry);
      parseArgs([noNpmSubCmd, registry]).args.should.containEql(registry);
    });

    it('should not use official or mirror registry even with `--npm` when arguments already have a registry', function() {
      var registry = '--registry=xx';
      parseArgs([npmSubCmd, registry, '--npm']).args.should.not.containEql(officialRegistry);
      parseArgs([npmSubCmd, registry, '--npm']).args.should.not.containEql(mirrorRegistry);
      parseArgs([noNpmSubCmd, registry, '--npm']).args.should.not.containEql(officialRegistry);
      parseArgs([noNpmSubCmd, registry, '--npm']).args.should.not.containEql(mirrorRegistry);

      parseArgs([npmSubCmd, registry, '--npm']).args.should.containEql(registry);
      parseArgs([noNpmSubCmd, registry, '--npm']).args.should.containEql(registry);
    });
  });

  context('cli', function() {
    var npm = path.join(root, 'bin', 'smart-npm.js');
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
