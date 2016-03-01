"use strict";

var userShowApi_100 = require("./api/user-show.1.0.0");

module.exports = function(conf) {
	var version = conf.version;

	switch ( version ) {
		case "1.0.0":
			return userShowApi_100(conf);
		default:
			return new Promise(function(rs, rj) {
				rj("No such api version.");
			});
	}
};
