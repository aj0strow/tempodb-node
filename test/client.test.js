require('dotenv').load()
var assert = require('assert')
var async = require('async')
var client = require('../lib/client')

describe('lib/client', function () {
  var tempodb = client(process.env.TEMPODB_KEY, process.env.TEMPODB_SECRET)

  after(function (done) {
    tempodb.sdelete({ allow_truncation: true }, done)
  })

  describe('screate', function () {
    it('should create a new series', function (done) {
      var props = { key: 'screate-0', tags: [ 'mcgill' ] }
      tempodb.screate(props, function (e, series) {
        assert.equal(props.key, series.key)
        assert.deepEqual(props.tags, series.tags)
        done(e)
      })
    })
  })

  describe('sget', function () {
    var props = { key: 'sget-0' }

    before(function (done) {
      tempodb.screate(props, done)
    })

    it('should get the series', function (done) {
      tempodb.sget(props.key, function (e, series) {
        assert.equal(props.key, series.key)
        done(e)
      })
    })
  })

  describe('squery', function () {
    var series = [
      { key: 'squery-0', tags: [ 'squery' ] },
      { key: 'squery-1', tags: [ 'squery' ], attributes: { squery: 5 } },
      { key: 'squery-2', attributes: { squery: 5 } }
    ]

    before(function (done) {
      async.each(series, tempodb.screate.bind(tempodb), done)
    })

    it('should query by key', function (done) {
      tempodb.squery({ key: 'squery-0' }, function (e, series) {
        assert.equal(1, series.length)
        done(e)
      })
    })

    it('should query by tag', function (done) {
      tempodb.squery({ tag: 'squery' }, function (e, series) {
        assert.equal(2, series.length)
        done(e)
      })
    })

    it('should query by attr', function (done) {
      tempodb.squery({ attr: { squery: 5 } }, function (e, series) {
        assert.equal(2, series.length)
        done(e)
      })
    })
  })

  describe('sdelete', function () {
    var props = { key: 'sdelete' }

    before(function (done) {
      tempodb.screate(props, done)
    })

    it('should delete by key', function (done) {
      tempodb.sdelete(props, function (e, response) {
        assert.equal(1, response.deleted)
        done(e)
      })
    })
  })
})
