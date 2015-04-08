// https://nodei.co
// http://mora.sinaapp.com/utils/npm-stats.php?pkg=smart-npm

/**
 * @mixin
 * @alias actions/stats
 */

var utils = require('../lib/utils');

module.exports = function(parsedArgs) {
  var rest = parsedArgs.rest;
  if (rest.length < 2) {
    console.error('\r\n\r\n\tUsage: npm stats [ -m{number} ] {package}\r\n\r\n');
  } else {
    var months = 2;
    var monthsFlag = -2;

    parsedArgs.args.forEach(function(arg, i) {
      if (/^-m(\d+)$/.test(arg)) {
        months = RegExp.$1;
      } else if ('-m' === arg || '--months' === arg || '--month' === arg) {
        monthsFlag = i;
      } else if ( i - 1 === monthsFlag && /^\d+$/.test(arg)) {
        months = arg;
      }
    });

    var base = 'http://mora.sinaapp.com/utils/npm-stats.php?months=' + months + '&pkg=';

    for (var i = 1; i < rest.length; ++i) {
      if (!/^\d+$/.test(rest[i])) {
        utils.openurl(base + rest[i]);
      }
    }
  }
};
