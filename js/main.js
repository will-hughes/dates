$(function() {

	var FULL_TIME_WORKING_DAYS = 30;
	var PART_TIME_WORKING_DAYS = 45;

	function update() {
		week = $('input[name="week"]').val();

		var dates = loadDates();

		if (dates.error.length) {
			console.error(dates.error);
			return;
		} else {
			dates = dates.dates;
		}

		var labels = dates.shift();
		var week1Start = moment(dates.shift()[0], 'DD/MM/YYYY');
		var nonWorkingDates = [];

		var moduleStart = week1Start.add(week - 1, 'week');

		dates.forEach(function (date) {
			if (date.length !== 5) { return; }

			var start = date[2];
			var end = date[3];
			var affects = date[4].toLowerCase();

			var affected = {
				students: false,
				staff: false
			};

			if (affects === 'both') {
				affected.students = true;
				affected.staff = true;
			} else if (affects === 'student') {
				affected.students = true;
			} else {
				console.error('Unrecognised : ' + affects + '. Affected must be either of: [student, both].');
			}

			var dateRange = generateDateRange(start, end).map(function (date) {
				return {
					date: date,
					affects: affected
				};
			});

			nonWorkingDates = nonWorkingDates.concat(dateRange);
		});

		let day = moduleStart;

		console.log(day._d);
		for (var i = 0; i < FULL_TIME_WORKING_DAYS; i++) {
			day = addWorkingDay({
				day: moduleStart,
				nwds: nonWorkingDates
			});
		}
		console.log(day._d);

		var ft_submission = day.format("DD/MM/YYYY");
		$('.ft-submission').text(ft_submission);
	}

	$('button').on('click', update);
	$('input').on('change', update);
	$('input').on('keyup', update);
});
