"use strict";

var express = require('express');
var app = express();
var oauth = require("./lib/oauth");
var userTimelineApi = require("./lib/user-timeline");
var userShowApi = require("./lib/user-show");

app.get('/:version/user-timeline', function (req, res) {
	var oauthPromise = oauth();
	var version = req.params.version;
 	oauthPromise.then(
 		function(bearer) {

 			return userTimelineApi({
 				bearer: bearer,
 				version: version,
 				query: req.query
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

app.get('/:version/user-show', function (req, res) {
	var oauthPromise = oauth();
	var version = req.params.version;
 	oauthPromise.then(
 		function(bearer) {
 			return userShowApi({
 				bearer: bearer,
 				version: version,
 				query: req.query
 			});
 		}
 	).then(
 		function(json) {

 			res.send(json);
 		},
 		function error(err) {

			res.send({
				"errors": [
					err
				]
			});
		}
 	);
});

app.listen(process.env.PORT || 8080, process.env.IP || "0.0.0.0");
