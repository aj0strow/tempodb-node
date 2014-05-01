module.exports = {
  // request(method, path, params, jsonbody, callback)

  screate: function (props, callback) {
    this.request('post', '/series', null, props, callback)
  },

  sget: function (key, callback) {
    var path = '/series/key/' + key
    this.request('get', path, null, null, callback)
  },

  squery: function (props, callback) {
    this.request('get', '/series', props, null, callback)
  },

  supdate: function (key, props, callback) {
    var path = '/series/key/' + key
    this.request('put', path, null, props, callback)
  },

  sdelete: function (props, callback) {
    this.request('delete', '/series', props, null, callback)
  }
}
