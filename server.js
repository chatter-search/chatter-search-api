"use strict";

var express = require('express');
var app = express();
var oauth = require("./lib/oauth");
var userTimelineApi = require("./lib/user-timeline");

app.get('/proxy-user-timeline', function (req, res) {
	var oauthPromise = oauth();
 	oauthPromise.then(
 		function(bearer) {

 			return userTimelineApi({
 				bearer: bearer
 			});
 		}
 	).then(
 		function(json) {

 			res.send(json);
 		},
 		function error(err) {

			res.send({
				"error": err
			});
		}
 	);
});

app.listen(process.env.PORT || 8080, process.env.IP || "0.0.0.0");
