var gigasecond = function(date) {
	date.setSeconds(date.getSeconds() + Math.pow(10, 9));
	return date;
};

module.exports = {gigasecond};

