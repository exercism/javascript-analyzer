export const gigasecond = (oldDate) => {
	var newDate = new Date();
	newDate.setTime((oldDate.getTime()) + 1000000000000);
	return newDate;
};