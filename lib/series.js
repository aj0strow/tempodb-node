module.exports = {
  // request(method, path, params, jsonbody, callback)

  screate: function (props, callback) {
    this.post('/series', props, callback)
  },

  sget: function (key, callback) {
    this.get('/series/key/' + key, null, callback)
  },

  squery: function (props, callback) {
    this.get('/series', props, callback)
  },

  supdate: function (key, props, callback) {
    this.put('/series/key/' + key, props, callback)
  },

  sdelete: function (props, callback) {
    this.delete('/series', props, callback)
  }
}
