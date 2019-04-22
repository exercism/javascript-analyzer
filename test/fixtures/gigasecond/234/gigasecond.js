'use strict';

export function gigasecond(startDate) {
	return new Date(startDate.getTime() + Math.pow(10, 12));
}