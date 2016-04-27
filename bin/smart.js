/**
 * @mixin
 * @alias actions/user
 */

var helper = require('../scripts/helper');

module.exports = function(parsedArgs) {
  var rest = parsedArgs.rest;
  let allows = ['uninstall'];
  let sub = rest[1];

  if (allows.indexOf(sub) < 0) {
    console.error('\r\n\r\n\tUsage: npm smart (' + allows.join('|') + ')\r\n\r\n');
  } else if (sub === 'uninstall') {
    helper.uninstall();
    console.log('Original npm recovered');
    console.log('Please run `npm uninstall -g smart-npm` to proceed');
  }
};
