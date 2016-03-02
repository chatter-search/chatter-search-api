"use strict";

var userShowApi_100 = require("./api/user-show.1.0.0");
var userShowApi_110 = require("./api/user-show.1.1.0");

module.exports = function(conf) {
	var version = conf.version;

	switch ( version ) {
		case "1.0.0":
			return userShowApi_100(conf);
		case "1.1.0":
			return userShowApi_110(conf);
		default:
			return new Promise(function(rs, rj) {
				rj("No such api version.");
			});
	}
};
