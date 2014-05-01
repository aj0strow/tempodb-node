var moment = require('moment')

module.exports = isoformat

function isoformat (input) {
  return moment(input).format('YYYY-MM-DDTHH:mm:ss.SSSZZ')
}
