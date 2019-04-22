'use strict';

exports.gigasecond = function(dateInput) {
	var date = dateInput;
    date.setSeconds(date.getSeconds() + 10**9);
    return date;
};