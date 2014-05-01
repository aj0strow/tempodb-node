var zlib = require('zlib')
var encode = require('./request/encode')
var isoformat = require('./request/isoformat')

module.exports = {
  request: function (method, path, params, json, callback) {
    path = this.path + encodeURI(path)
    if (params) path += '?' + encode(params)

    var body = json ? JSON.stringify(json) : ''
    this.headers['content-length'] = body.length

    var options = {
      host: this.hostname,
      port: this.port,
      path: path,
      method: method,
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
          if (response < 300) {
            var json = (data.length > 0) ? JSON.parse(data) : {}
            callback(null, json)
          } else {
            callback(new Error('(' + response + ') ' + data))
          }
        }
      })
    })
    req.on('error', callback)
    req.end(body)
  },

  get: function (path, params, callback) {
    this.request('get', path, params, null, callback)
  },

  post: function (path, jsonbody, callback) {
    this.request('post', path, null, jsonbody, callback)
  },

  put: function (path, jsonbody, callback) {
    this.request('put', path, null, jsonbody, callback)
  },

  delete: function (path, params, callback) {
    this.request('delete', path, params, null, callback)
  }
}
