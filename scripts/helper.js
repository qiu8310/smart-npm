var fs = require('fs'),
  path = require('path');

var isWin = process.platform === 'win32',
  npmDir = path.dirname(process.execPath),
  npmPath = path.join(npmDir, isWin ? 'npm.cmd' : 'npm'),
  npmBackupPath = path.join(npmDir, isWin ? 'npm-original.cmd' : 'npm-original');

var installMsg = 'rename: ' + npmPath + ' => ' + npmBackupPath,
  uninstallMsg = 'rename: ' + npmBackupPath + ' => ' + npmPath;


/**
 * pre-install hook
 *
 * @returns {boolean}
 */
exports.install = function() {
  if (process.env.CI) return true;

  if (fs.existsSync(npmPath) && !fs.existsSync(npmBackupPath)) {
    fs.renameSync(npmPath, npmBackupPath);
    console.log('Success ' + installMsg);
  } else {
    console.error('Error ' + installMsg);
    process.exit(1);
  }
};


/**
 * post-uninstall hook
 *
 * @returns {boolean}
 */
exports.uninstall = function() {
  if (process.env.CI) return true;

  if (fs.existsSync(npmBackupPath)) {
    fs.renameSync(npmBackupPath, npmPath);
    console.log('Success: ' + uninstallMsg);
  } else {
    console.error('Error: ' + uninstallMsg);
    process.exit(1);
  }
};