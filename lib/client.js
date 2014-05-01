var http = require('http')
var https = require('https')
var zlib = require('zlib')

var encode = require('./encode')
var isoformat = require('./isoformat')

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
  this.key = key
  this.secret = secret
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

TempoDB.prototype.request = function (verb, path, params, json, callback) {
  path = this.path + encodeURI(path)
  if (params) path += '?' + encode(params)

  var body = json ? JSON.stringify(json) : ''
  this.headers['content-length'] = body.length

  var options = {
    host: this.hostname,
    port: this.port,
    path: path,
    method: verb,
    headers: this.headers
  }

  var req = this.connection.request(options, function (res) {
    var chunks = []
    var response = res.statusCode

    if (res.headers['content-encoding'] == 'gzip') {
      res = res.pipe(zlib.createGunzip())
    }

    res.on('data', chunks.push.bind(chunks))
    res.on('end', function () {
      if (callback) {
        var data = chunks.join('')
        if (response < 300 && data.length > 0) data = JSON.parse(data)
        callback(null, { response: response, body: data })
      }
    })
  })
  req.on('error', callback)
  req.end(body)
}
