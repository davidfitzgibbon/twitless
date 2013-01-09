var twitless = twitless || {};

$(function($) {
	twitless.Twitlist = Backbone.View.extend({
		el: '#app',
		template: _.template( $('#tweet').html()),

		initialize: function () {
			this.getTweets(twitless.twit);

		},

		renderTweets: function() {
			var that = this,
				twitlessCount = 0;
			_.map(twitless.tweets.models, function (item) {
				if ( item.get('text').charAt(0) !== '@') {
					twitlessCount++;
					that.render(item);
				}
			});

			$('.blurb').hide();
			$('#loading').hide();
			$('.twit_perc').remove();
			$('h1').after('<div class="twit_perc"><img src="img/kicks.gif" /><h2>' + twitlessCount + '<span> twits kicked out</span></h2></div>');
		},
		render: function (model) {
			var tweet = this.template(model.toJSON());
			this.$el.append(tweet);
		},
		getTweets: function (username) {
			$('.tweet').remove();
			this.$el.append('<img id="loading" src="img/loading.gif" />');
			var that = this;
			$.getJSON('https://api.twitter.com/1/statuses/user_timeline/' + username + '.json?count=50&include_rts=1&callback=?', function(data) {
				if(twitless.tweets){
					twitless.tweets.reset();
				}
				$('#loading').remove();
				console.log(data);
				if ( data.length > 5) {
					twitless.tweets = new twitless.Tweets(data);
					that.renderTweets();
				} else {
					that.$el.append('<div class="tweet error">User not found</div>');

					$('.blurb').hide();
					$('.twit_perc').remove();
					$('h1').after('<div class="twit_perc"><img src="img/kicks.gif" /><h2>0<span> twits kicked out</span></h2></div>');
				}
			});
		}
	});
});