$(function() {
	'use strict';

	var contains = function (range, other, debug, filter) {
		for (var i = 0; i < range.length; i++) {
			var difference = range[i].date.diff(other, 'days');
			if (difference === 0 && range[i].affects[filter]) {
				debug.write([
					'Skipping',
					range[i].label,
					'for',
					filter,
					'||',
					range[i].date.format('DD/MM/YYYY')
				].join(' '));
				return true;
			}
		}

		return false;
	};

	var isWeekend = function (date, debug) {
		var dayOfWeek = date.isoWeekday();

		if (dayOfWeek === 6 || dayOfWeek === 7) {
			debug.write('Skipping weekend || ' + date.format('DD/MM/YYYY'));
			return true;
		}

		return false;
	};

	window.addWorkingDay = function (opts) {
		var day = opts.day;
		var nwds = opts.nwds;
		var filter = opts.filter;
		var debug = opts.debug;
		var i = opts.i;

		var nextDay = day.clone().add(1, 'day');

		while(contains(nwds, nextDay, debug, filter) || isWeekend(nextDay, debug)) {
			nextDay = nextDay.add(1, 'day');
		}

		debug.write('Adding working day: ' + (i+1) + ' || ' + nextDay.format('DD/MM/YYYY'));
		return nextDay;
	};
});
