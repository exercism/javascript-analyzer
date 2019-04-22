export const gigasecond = (gs) => {
	var d = new Date(gs);
	var gigasecond = Math.pow(10, 9);
	var seconds = d.setUTCSeconds(d.getUTCSeconds() + gigasecond);
	var date = new Date(seconds);
	return date;
};