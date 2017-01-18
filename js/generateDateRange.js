$(function() {
	'use strict';

	window.generateDateRange = function(start, end) {
		start = moment(start, "DD/MM/YYYY");
		end = moment(end, "DD/MM/YYYY");

		var range = [start];

		while (range[range.length - 1].diff(end, 'days') < 0) {
			var date = range[range.length - 1].clone();
			date.add(1, 'days');
			range.push(date);
		}

		return range;
	};
});
