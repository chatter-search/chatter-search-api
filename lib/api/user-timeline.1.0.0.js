"use strict";

var request = require('request-json');
var twitterApiUri = process.env.TWITTER_API_URI;
var timelineUri = twitterApiUri + "1.1/statuses/user_timeline.json";
var client = request.createClient(timelineUri);
var _ = require("lodash");

module.exports = function(conf) {

	return new Promise(function(rs, rj) {
		var screen_name = conf.query.screen_name || "";
		var bearer = conf.bearer;

		client.headers["Authorization"] = "Bearer " + bearer;

		var timelineFq = timelineUri + "?screen_name=" + screen_name;
		client.get(timelineFq, function(err, res, body) {
			if (err) {

				rj(err);
			} else {
				if ( _.isPlainObject(body) ) {
					// making sure we've got collection
					//+ seems like there is lag in Twitter API
					//+ if there is no user tweets it returns
					//+ {"request":"/1.1/statuses/user_timeline.json","error":"Not authorized."}
					//+ when you expect just empty array...
					rs([]);
				} else {

					// otherwise parse response...
					rs(_.map(body, function(el) {
						var info = _.pick(el, [
							"created_at",
							"text"
						]);

						// it seems like another way to determine retweeted
						//+ entry is parse text for "RT @...:"
						//+ for now this is a way to go.
						info.is_retweet = Boolean(el.retweeted_status);

						// and parse out photo/image(s)
						var media = el.entities && el.entities.media;
						var photos = [];
						if (media) {
							photos = _.filter(media, function(el) {
								return el.type === "photo";
							});
						}
						// if any...
						if (photos.length) {
							info.photos = _.map(photos, function(el) {
								return _.pick(el, [
									"media_url",
									"media_url_https",
									"url"
								]);
							});
						}

						return info;
					}));

				}
			}
		});

	});
};
