var fs = require('fs'),
  path = require('path');

var isWin = process.platform === 'win32',
  npmDir = path.dirname(process.execPath),
  npmPath = path.join(npmDir, isWin ? 'npm.cmd' : 'npm'),
  npmPreBackupPath = path.join(npmDir, isWin ? '_npm-original.cmd' : '_npm-original'),
  npmBackupPath = path.join(npmDir, isWin ? 'npm-original.cmd' : 'npm-original');


var installMsg = 'rename: ' + npmPath + ' => ' + npmBackupPath,
  uninstallMsg = 'rename: ' + npmBackupPath + ' => ' + npmPath;


/**
 *
 * 判断指定的 symlink 是否是默认的 npm 的 symlink
 *
 * TODO windows 怎么判断
 *
 * @param {String} symlink - symlink 文件路径
 */
function isSymlinkOriginalNpm(symlink) {
  try {
    var fullpath = path.resolve(symlink),
      realpath = fs.realpathSync(symlink);

    if (fullpath !== realpath && realpath.split('/').indexOf('npm') > 0) {
     return true;
    }
  } catch (e) {}

  return false;
}

console.log(isSymlinkOriginalNpm('/usr/local/bin/npm'));
console.log(isSymlinkOriginalNpm('/usr/local/lib/node_modules/npm/bin/npm-cli.js'));

/**
 * pre-install hook
 *
 */
function preInstall() {

  if (fs.existsSync(npmPath) && !fs.existsSync(npmPreBackupPath) && isSymlinkOriginalNpm(npmPath)) {
    try {
      fs.renameSync(npmPath, npmPreBackupPath);
      console.log('Success ' + installMsg);
    } catch (e) {
      console.error('Error ' + installMsg);
      process.exit(1);
    }
  }
}


/**
 *
 * post-install hook
 *
 *
 */
function postInstall() {
  // 判断有没新的 npm 文件，有的话全局安装成功，否则是本地安装，把原 npm 文件恢复
  if (fs.existsSync(npmPath)) {
    fs.renameSync(npmPreBackupPath, npmBackupPath);
  } else {
    fs.renameSync(npmPreBackupPath, npmPath);
  }
}


/**
 * post-uninstall hook
 *
 */
function postUninstall() {
  if (process.env.CI) return true;

  if (fs.existsSync(npmBackupPath)) {
    try {
      fs.renameSync(npmBackupPath, npmPath);
      console.log('Success: ' + uninstallMsg);
    } catch (e) {
      console.error('Error: ' + uninstallMsg);
      process.exit(1);
    }
  }
}