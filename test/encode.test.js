var assert = require('assert')
var encode = require('../lib/request/encode')

describe('lib/request/encode', function () {
  it('should encode arrays directly', function () {
    var query = encode({ a: [ 1, 2 ] })
    assert.equal('a=1&a=2', query)
  })

  it('should encode objects normally', function () {
    var query = encode({ o: { x: 1, y: 2 } })
    assert.equal('o[x]=1&o[y]=2', query)
  })

  it('should encode string normally', function () {
    var query = encode({ key: '003', tag: [ 'a', 'b' ], attr: { x: 'y' } })
    assert.equal('key=003&tag=a&tag=b&attr[x]=y', query)
  })
})
