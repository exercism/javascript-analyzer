export var gigasecond = function (date) {
	return new Date(date.setSeconds(date.getSeconds() + (10**9)));
};