$(function() {
	'use strict';

	var dates;
	var error;

	window.loadDates = function() {
		return {
			error: error,
			dates: dates.slice()
		};
	};

	$.ajax({
		type: "GET",
		url: "dates/2019-20.csv",
		dataType: "text",
		success: function(data) {
			var result = Papa.parse(data);
			dates = result.data;
			error = result.errors;
		}
	});
});
