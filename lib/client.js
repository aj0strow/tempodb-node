var http = require('http')
var https = require('https')
var merge = require('merge-descriptors')

var Request = require('./request')
var Series = require('./series')
var Data = require('./data')

const HOST = 'api.tempo-db.com'
const PORT = 443
const VERSION = 'v1'
const SECURE = true

module.exports = client

// options
//  hostname: string
//  port: string
//  secure: boolean
//  version: string
function client (key, secret, options) {
  return new TempoDB(key, secret, options)
}

function TempoDB(key, secret, options) {
  options = Object(options)
  var hostname = options.hostname || HOST
  var headers = {
    'host': hostname,
    'authorization': basicAuth(key, secret),
    'user-agent': 'tempodb-node/0.0.0',
    'accept-encoding': 'gzip',
    'connection': 'keep-alive'
  }
  this.hostname = hostname
  this.port = options.port || PORT
  this.connection = (options.secure != false) && SECURE ? https : http
  this.version = options.version || VERSION
  this.path = '/' + this.version
  this.headers = headers
}

function basicAuth(key, secret) {
  return 'Basic ' + new Buffer(key + ':' + secret).toString('base64')
}

merge(TempoDB.prototype, Request)
merge(TempoDB.prototype, Series)
merge(TempoDB.prototype, Data)
