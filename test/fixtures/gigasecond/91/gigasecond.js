export const gigasecond = (date) => {
	return new Date(date.getTime(date) + Math.pow(10,12));
};