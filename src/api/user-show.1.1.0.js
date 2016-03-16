// This is common entry point for
// v1.1.0 and v1.2.0
'use strict'

var request = require('request-json')
var twitterApiUri = process.env.TWITTER_API_URI
var showUri = twitterApiUri + '1.1/users/show.json'
var client = request.createClient(showUri)
var _ = require('lodash')

module.exports = function (conf) {
  return new Promise(function (resolve, reject) {
    var screen_name = conf.query.screen_name || ''
    if (!screen_name) {
      reject({
        'error': "Missed required parameter 'screen_name'."
      })
    } else {
      var bearer = conf.bearer

      client.headers['Authorization'] = 'Bearer ' + bearer

      var timelineFq = showUri + '?screen_name=' + screen_name
      client.get(timelineFq, function (err, res, body) {
        if (err) {
          reject(err)
        } else {
          // in case no user found, we send null back...
          // + not quite religiously proper way, but rather intuitive.
          // Twitter responds with
          // + {"errors":[{"code":50,"message":"User not found."}]}
          // for version 2.0.0 it will throw 404 error, with appropriate
          // + explanation
          var data = _.pick(body, [
            'name',
            'screen_name',
            'description',
            'profile_image_url',
            'profile_image_url_https'
          ])
          data = _.keys(data).length ? data : null
          resolve(data)
        }
      })
    }
  })
}
