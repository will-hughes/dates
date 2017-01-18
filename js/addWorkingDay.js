$(function() {
	'use strict';

	var contains = function (range, other) {
		for (var i = 0; i < range.length; i++) {
			var difference = range[i].date.diff(other, 'days');
			if (difference === 0) {
				return true;
			}
		}

		return false;
	};

	var isWeekend = function (date) {
		var dayOfWeek = date.isoWeekday();

		return (dayOfWeek === 6 || dayOfWeek === 7);
	};

	window.addWorkingDay = function (options) {
		var day = options.day;
		var nwds = options.nwds;
		var filter = options.filter;

		console.log('Adding working day.');
		var nextDay = day.add(1, 'day');

		while(contains(nwds, nextDay) || isWeekend(nextDay)) {
			console.log('Result was a NWD, adding another.');
			nextDay = nextDay.add(1, 'day');
		}

		return nextDay;
	};
});
