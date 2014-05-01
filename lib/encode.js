// tempodb uses non-standard uri encoding for array values
// for ex { a: [ 1, 2 ] } goes to a=1&a=2 instead of a[]=1&a[]=2

var util = require('util')
var slice = Array.prototype.slice

module.exports = encode

function encode (json) {
  var parts = []
  for (var prop in json) {
    var value = json[prop]
    if (value instanceof Array) {
      for (var key in value) {
        parts.push(format('%s=%s', prop, value[key]))
      }
    } else if (value instanceof Object) {
      for (var key in value) {
        parts.push(format('%s[%s]=%s', prop, key, value[key]))
      }
    } else {
      parts.push(format('%s=%s', prop, value))
    }
  }
  return parts.join('&')
}

function format (pattern) {
  var args = slice.call(arguments, 1).map(escape)
  args.unshift(pattern)
  return util.format.apply(util, args)
}

function escape (string) {
  return encodeURIComponent(String(string))
}
