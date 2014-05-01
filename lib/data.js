module.exports = {
  skcreate: function (key, data, callback) {
    this.post('/series/key/' + key + '/data', data, callback)
  },

  sksingle: function (key, params, callback) {
    this.get('/series/key/' + key + '/single', params, callback)
  },

  sksegment: function (key, params, callback) {
    this.get('/series/key/' + key + '/segment', params, callback)
  },

  skrollups: function (key, params, callback) {
    this.get('/series/key/' + key + '/data/rollups/segment', params, callback)
  },

  sksummary: function (key, params, callback) {
    this.get('/series/key/' + key + '/summary', params, callback)
  },

  mcreate: function (data, callback) {
    this.post('/multi', data, callback)
  },

  msegment: function (params, callback) {
    this.get('/segment', params, callback)
  }
}
