var twitless = twitless || {};

(function() {

	var Router = Backbone.Router.extend({
		routes:{
			':twit': 'twit'
		},

		twit: function( twit ) {

			twitless.twit = twit;

			console.log(twitless.twit);

			new twitless.Twitlist();
		}
	});

	twitless.router = new Router();
	Backbone.history.start();

}());