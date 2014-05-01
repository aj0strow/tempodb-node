var assert = require('assert')
var moment = require('moment-timezone')
var isoformat = require('../lib/request/isoformat')

describe('lib/isoformat', function () {
  function format (time) {
    return isoformat(moment.tz(time, 'America/Montreal'))
  }

  it('should format date', function () {
    var date = new Date(2014, 0, 3, 14, 23, 33, 0);
    assert.equal('2014-01-03T14:23:33.000-0500', format(date))
  })

  it('should format string', function () {
    var date = 'Jan 3, 2014 14:23:33'
    assert.equal('2014-01-03T14:23:33.000-0500', format(date))
  })
})
