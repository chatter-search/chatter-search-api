'use strict'

var userShowApi = {
  '1.0.0': require('./api/user-show.1.0.0'),
  '1.1.0': require('./api/user-show.1.1.0'),
  '1.2.0': require('./api/user-show.1.1.0') // for compliance reason bumping up
//                                          + api version, although it is only affects
//                                          + user_timelie api
}

module.exports = function (conf) {
  var version = conf.version
  if (userShowApi.hasOwnProperty(version)) {
    return userShowApi[version](conf)
  }

  return new Promise(function (resolve, reject) {
    reject('No such api version.')
  })
}
