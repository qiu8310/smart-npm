/**
 * @mixin
 * @alias actions/user
 */

var utils = require('../lib/utils')

module.exports = function(parsedArgs) {
  var rest = parsedArgs.rest
  if (rest.length < 2) {
    console.error('\r\n\r\n\tUsage: npm user [-t] {username}\r\n\r\n')
  } else {
    var base = parsedArgs.args.indexOf('-t') >= 0 ? 'https://npm.taobao.org/~' : 'https://www.npmjs.com/~'

    for (var i = 1; i < rest.length; ++i) {
      utils.openurl(base + rest[i])
    }
  }
}
