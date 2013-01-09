var twitless = twitless || {};

$(function($) {
	twitless.FormView = Backbone.View.extend({
		el: '#app',
		template: _.template( $('#form').html()),

		initialize: function () {
			this.render();
		},

		render: function() {
			this.$el.html(this.template);
		},

		events: {
			"submit form" : "get_tweets"
		},

		get_tweets: function () {

			twitless.twit = $('#twit').val();

			new twitless.Twitlist();

			return false;
		}
	});
});