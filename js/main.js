$(function() {

	var FULL_TIME_WORKING_DAYS = 30;
	var PART_TIME_WORKING_DAYS = 45;
	var INPUT_FORMAT = 'dddd D MMMM YYYY';
	var OUTPUT_FORMAT = 'D MMM YYYY';

	function update() {
		week = $('input[name="week"]').val();

		if (parseInt(week, 10) < 4 || parseInt(week, 10) > 42) {
			$('input[name="week"]')
				.css('border-color', 'red')
				.css('background-color', '#fcc');
		} else {
			$('input[name="week"]')
				.css('border-color', '')
				.css('background-color', '');
		}

		var dates = loadDates();

		if (dates.error.length) {
			console.error(dates.error);
			return;
		} else {
			dates = dates.dates;
		}

		/*var labels = */dates.shift();
		var week1Start = moment(dates.shift()[0], 'DD/MM/YYYY');
		var nonWorkingDates = [];

		var moduleStart = week1Start.add(week - 1, 'week');

		dates.forEach(function (date) {
			if (date.length !== 5) { return; }

			var label = date[1];
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
					affects: affected,
					label: label
				};
			});

			nonWorkingDates = nonWorkingDates.concat(dateRange);
		});

		$('.module-start').text(moduleStart.format(INPUT_FORMAT));

		var i, debug;

		var ft_submission = moduleStart;
		debug = makeDebug($('.debug-ft-submission'), ft_submission);
		for (i = 0; i < FULL_TIME_WORKING_DAYS; i++) {
			ft_submission = addWorkingDay({
				day: ft_submission,
				nwds: nonWorkingDates,
				debug: debug,
				i: i,
				filter: 'students'
			});
		}
		$('.ft-submission').text(ft_submission.format(OUTPUT_FORMAT));

		var ft_feedback = ft_submission;
		debug = makeDebug($('.debug-ft-feedback'), ft_feedback);
		for (i = 0; i < 15; i++) {
			ft_feedback = addWorkingDay({
				day: ft_feedback,
				nwds: nonWorkingDates,
				debug: debug,
				i: i,
				filter: 'staff',
			});
		}
		$('.ft-feedback').text(ft_feedback.format(OUTPUT_FORMAT));

		var pt_submission = moduleStart;
		debug = makeDebug($('.debug-pt-submission'), pt_submission);
		for (i = 0; i < PART_TIME_WORKING_DAYS; i++) {
			pt_submission = addWorkingDay({
				day: pt_submission,
				nwds: nonWorkingDates,
				debug: debug,
				i: i,
				filter: 'students'
			});
		}
		$('.pt-submission').text(pt_submission.format(OUTPUT_FORMAT));

		var pt_feedback = pt_submission;
		debug = makeDebug($('.debug-pt-feedback'), pt_feedback);
		for (i = 0; i < 15; i++) {
			pt_feedback = addWorkingDay({
				day: pt_feedback,
				nwds: nonWorkingDates,
				debug: debug,
				i: i,
				filter: 'staff'
			});
		}
		$('.pt-feedback').text(pt_feedback.format(OUTPUT_FORMAT));

	}

	$('button').on('click', update);
	$('input').on('change', update);
	$('input').on('keyup', update);

	$('.toggle').click(function () {
		$('.debug').slideToggle();
	});
});
