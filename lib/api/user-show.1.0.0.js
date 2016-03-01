"use strict";

var request = require('request-json');
var twitterApiUri = process.env.TWITTER_API_URI;
var showUri = twitterApiUri + "1.1/users/show.json";
var client = request.createClient(showUri);

module.exports = function(conf) {

	return new Promise(function(rs, rj) {
		var screen_name = conf.query.screen_name;
		var bearer = conf.bearer;

		client.headers["Authorization"] = "Bearer " + bearer;

		var timelineFq = showUri + "?screen_name=" + screen_name;
		client.get(timelineFq, function(err, res, body) {
			if (err) {

				rj(err);
			} else {

				rs({
					name: body.name,
					screen_name: body.screen_name,
					description: body.description,
					profile_image_url: body.profile_image_url_https,
					profile_image_url_https: body.profile_image_url_https,
				});
			}
		});

	});
};
