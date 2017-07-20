/**
 * @mixin
 * @alias actions/update-npm
 */

var path = require('path')
var cp = require('child_process')
var utils = require('../lib/utils')

module.exports = function(parsedArgs) {
  if (parsedArgs.args[1] === '-h' || parsedArgs.args[1] === '--help') {
    console.log('\r\n\r\n\tUsage: npm install-npm       # update npm to latest version\r\n\t       npm install-npm 5.0.0 # update npm to 5.0.0\r\n\r\n')
  } else {
    process.chdir(path.dirname(__dirname))
    var version = parsedArgs.rest[1] || 'latest'
    cp.spawn('npm', ['install', 'npm@' + version], {stdio: 'inherit'})
  }
}
