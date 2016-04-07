# Chatter search API

> Pocking around Twitter's API

Hosted on [Heroku](https://chatter-search-api.herokuapp.com/).

### Version 1.2.0

1. GET `/1.2.0/user_show?screen_name=twitterapi`

	Mirrow for 1.1.0, meaning it is exact same.


2. GET `/1.2.0/user_timeline?screen_name=twitterapi`

	Added `created_at_timestamp` and `text_length` properties, which are created time UNIX timestamp and tweet length.

	Property `created_at` now depricated in favor of timestamp, meaning `created_at` will be removed in future releases (planned for 2.0.0).

### Version 1.1.0

The `screen_name` is now required to all. The error with 400 status is what will be returned back in this case.


		{
			"error": "Missed required parameter 'screen_name'."
		}


1. GET `/1.1.0/user_show?screen_name=twitterapi`

	Same as 1.0.0. Except it will return error when no 'screen_name' provided.


2. GET `/1.1.0/user_timeline?screen_name=twitterapi`

	Added `retweet_count` property. And error.

### Version 1.0.0


1. GET `/1.0.0/user_show?screen_name=twitterapi`

	Leveraging Twitter's [/1.1/statuses/user_timeline.json](https://dev.twitter.com/rest/reference/get/statuses/user_timeline) API entry.
	Lookup user details for provided `screen_name`.
	Return hash object with basic information picked up from Twitter's response.
	Or `null` if user is not found or `screen_name` not provided.
	For example, the top request, with `twitterapi` screen name, will return:


		{
		  "name": "Twitter API",
		  "screen_name": "twitterapi",
		  "description": "The Real Twitter API. I tweet about API changes, service issues and happily answer questions about Twitter and our API. Don't get an answer? It's on my website.",
		  "profile_image_url": "http://pbs.twimg.com/profile_images/2284174872/7df3h38zabcvjylnyfe3_normal.png",
		  "profile_image_url_https": "https://pbs.twimg.com/profile_images/2284174872/7df3h38zabcvjylnyfe3_normal.png"
		}



2. GET `/1.0.0/user_timeline?screen_name=twitterapi`

	Leveraging Twitter's [/1.1/users/show.json](https://dev.twitter.com/rest/reference/get/users/show) API entry.
	Lookup for user tweets associated with `screen_name`.
	Return collection of hash objects with selected information. There is couple of mutations on the hashes.

	-  `is_retweet` - flag indication in case of entry is retweet.
	-  `photos` collection of media entities with type `photo`.

	In case no tweets/no user/no `sceen_name` it will return empty array.

	Example from query above:


		[
		  {
		    "created_at": "Thu Feb 25 13:52:20 +0000 2016",
		    "text": "Deprecation of XML response type for single Tweet oEmbed - details of changes required to affected code here -&gt; https://t.co/PJrqvzMEIJ",
		    "is_retweet": false
		  },
		  {
		    "created_at": "Thu Feb 25 13:46:01 +0000 2016",
		    "text": "RT @AdsAPI: Later this quarter we’ll begin to version changes we make to the #AdsAPI for a better, more predictable DX https://t.co/VnyBdsV…",
		    "is_retweet": true
		  },
		  {
		    "created_at": "Wed Jan 20 19:14:37 +0000 2016",
		    "text": "RT @TwitterDev: Announcing our #HelloWorld Tour -- Join us! https://t.co/m8ZjGu7Kpg https://t.co/ondOESIH1O",
		    "is_retweet": true,
		    "photos": [
		      {
		        "media_url": "http://pbs.twimg.com/tweet_video_thumb/CZLpPepWQAEX98_.png",
		        "media_url_https": "https://pbs.twimg.com/tweet_video_thumb/CZLpPepWQAEX98_.png",
		        "url": "https://t.co/ondOESIH1O"
		      }
		    ]
		  }
		  ....
		]
