function Gigasecond(date) {
	this.startDate = date;
}

Gigasecond.prototype.date = function() {
	var startTime = this.startDate.getTime();
	var endDate = new Date(startTime + 1000000000000);
	endDate.setHours(0);
	endDate.setSeconds(0);
	endDate.setMinutes(0);
	return endDate;
}

module.exports = Gigasecond;
