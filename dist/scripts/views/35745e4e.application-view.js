var twitless = twitless || {};

$(function($) {
	twitless.AppView = Backbone.View.extend({
		el: '#container',
		template: _.template( $('#shell').html()),

		initialize: function () {
			this.render();
		},

		render: function() {
			this.$el.html(this.template);

			new twitless.FormView();
		}
	});
});