"use strict";

var userTimelineApi_100 = require("./api/user-timeline.1.0.0");
var userTimelineApi_110 = require("./api/user-timeline.1.1.0");

module.exports = function(conf) {
	var version = conf.version;

	switch ( version ) {
		case "1.0.0":
			return userTimelineApi_100(conf);
		case "1.1.0":
			return userTimelineApi_110(conf);
		default:
			return new Promise(function(rs, rj) {
				rj("No such api version.");
			});
	}
};
