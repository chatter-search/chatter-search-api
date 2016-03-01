"use strict";

var request = require('request-json');
var twitterApiUri = process.env.TWITTER_API_URI;
var showUri = twitterApiUri + "1.1/users/show.json";
var client = request.createClient(showUri);
var _ = require("lodash");

module.exports = function(conf) {

	return new Promise(function(rs, rj) {
		var screen_name = conf.query.screen_name || "";
		var bearer = conf.bearer;

		client.headers["Authorization"] = "Bearer " + bearer;

		var timelineFq = showUri + "?screen_name=" + screen_name;
		client.get(timelineFq, function(err, res, body) {
			if (err) {

				rj(err);
			} else {
				// in case no user found, we send null back...
				//+ not quite religiously proper way, but rather intuitive.
				// Twitter responds with
				//+ {"errors":[{"code":50,"message":"User not found."}]}
				var data = _.pick(body, [
					"name",
					"screen_name",
					"description",
					"profile_image_url",
					"profile_image_url_https"
				]);
				data = _.keys(data).length? data: null;
				rs(data);
			}
		});

	});
};
