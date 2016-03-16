'use strict'

var timelineApi = {
  '1.0.0': require('./api/user-timeline.1.0.0'),
  '1.1.0': require('./api/user-timeline.1.1.0'),
  '1.2.0': require('./api/user-timeline.1.2.0')
}

module.exports = function (conf) {
  var version = conf.version

  if (timelineApi.hasOwnProperty(version)) {
    return timelineApi[version](conf)
  }

  return new Promise(function (resolve, reject) {
    reject('No such api version.')
  })
}
