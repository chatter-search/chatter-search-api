"use strict";

var request = require('request-json');
var twitterApiUri = process.env.TWITTER_API_URI;
var timelineUri = twitterApiUri + "1.1/statuses/user_timeline.json";
var client = request.createClient(timelineUri);

module.exports = function(params) {
	return new Promise(function(rs, rj) {
		var uid = params.user_id || "twitter";
		var bearer = params.bearer;

		client.headers["Authorization"] = "Bearer " + bearer;

		var timelineFq = timelineUri + "?user_id=" + uid + "&screen_name=" + uid;
		client.get(timelineFq, function(err, res, body) {
		 	if ( err ) {

				rj(err);
			} else {

				rs(body);
			}
		});

	});
};
