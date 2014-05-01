var zlib = require('zlib')
var encode = require('./request/encode')
var isoformat = require('./request/isoformat')

module.exports = {
  request: function (verb, path, params, json, callback) {
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
          var json = (data.length > 0) ? JSON.parse(data) : {}
          if (response < 300) {
            callback(null, json)
          } else {
            callback(new Error(response))
          }
        }
      })
    })
    req.on('error', callback)
    req.end(body)
  }
}
