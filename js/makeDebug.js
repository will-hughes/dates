$(function() {
	'use strict';

	window.makeDebug = function ($el, startDate) {

		var messages = [
			'Starting: ' + startDate.format('DD/MM/YYYY')
		];

		return {
			write: function (message) {
				messages.push(message);
				$el.find('pre code')[0].innerHTML = messages.join("\n");
			}
		};
	};
});
