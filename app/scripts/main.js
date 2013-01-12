var twitless = twitless || {};

twitless.twit = '';

$(function() {
	new twitless.AppView();
});


/* FROM: http://www.quietless.com/kitchen/format-twitter-created_at-date-with-javascript/ */
// pass in the 'created_at' string returned from twitter //
// stamp arrives formatted as Tue Apr 07 22:52:51 +0000 2009 //
function parseTwitterDate($stamp)
{
// convert to local string and remove seconds and year //
	var date = new Date(Date.parse($stamp)).toLocaleString().substr(0, 16);
// get the two digit hour //
	var hour = date.substr(-5, 2);
// convert to AM or PM //
	var ampm = hour<12 ? ' AM' : ' PM';
	if (hour>12) hour-= 12;
	if (hour==0) hour = 12;
// return the formatted string //
	return date.substr(0, 11)+' • ' + hour + date.substr(13) + ampm;
}

function linkifyString(string) {
	string = string.split(" ");

	for (var i = 0; i < string.length; i++) {
		var chunk = string[i];

		if ( chunk.indexOf('http://') !== -1 || chunk.indexOf('https://') !== -1 || chunk.indexOf('.com') !== -1 ) {
			chunk = "<a href='" + chunk + "'>" + chunk + "</a>";
			string[i] = chunk;
		}

		if ( chunk.charAt(0) === '@' ) {
			var atlink = chunk,
				ending = '';
			atlink = atlink.substr(1);

			if( atlink.substring(atlink.length - 1) === ':' || atlink.substring(atlink.length - 1) === '?' || atlink.substring(atlink.length - 1) === '.') {
				ending = atlink.substring(atlink.length - 1);
				atlink = atlink.substring(0, atlink.length - 1);
			}

			chunk = "<a href='https://twitter.com/" + atlink + "'>@" + atlink + "</a>" + ending;
			string[i] = chunk;
		}
	}

	string = string.join(" ");

	return string;

}