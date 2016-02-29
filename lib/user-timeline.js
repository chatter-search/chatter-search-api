"use strict";

var request = require('request-json');
var twitterApiUri = process.env.TWITTER_API_URI;
var timelineUri = twitterApiUri + "1.1/statuses/user_timeline.json";

module.exports = function(params) {
	return new Promise(function(rs, rj) {
		var uid = params.user_id || "lapshukov";
		var timelineQs = "?user_id=" + uid + "&screen_name=" + uid;
		var client = request.createClient(timelineUri + timelineQs);

		var bearer = params.bearer;
		client.headers["Authorization"] = "Bearer " + bearer;
		client.get(timelineUri, function(err, res, body) {
		 	if ( err ) {

				rj(err);
			} else {

				rs(body);
			}
		});

	});
};
