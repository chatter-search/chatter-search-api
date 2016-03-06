"use strict";

var express = require("express");
var cors = require("cors");
var app = express();
app.use(cors());

var oauth = require("./src/oauth");
var userTimelineApi = require("./src/user-timeline");
var userShowApi = require("./src/user-show");

function errorHandler(res) {

	return function(err, code) {
		res.status(code || 400);
		res.json(err);
	};
}

app.get('/:version/user_timeline', function (req, res) {
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
 		function(data) {

 			res.json(data);
 		},
 		errorHandler(res)
 	);
});

app.get('/:version/user_show', function (req, res) {
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
 		function(data) {

 			res.json(data);
 		},
 		errorHandler(res)
 	);
});

app.listen(process.env.PORT || 8080, process.env.IP || "0.0.0.0");
