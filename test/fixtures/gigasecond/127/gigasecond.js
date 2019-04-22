'use strict';

export const gigasecond = (date) => {
	date = Date.parse(date) + (Math.pow(10, 9) * 1000);
	return new Date(date);
};