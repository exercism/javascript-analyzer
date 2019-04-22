export const gigasecond = function(date) {
	var billionSeconds = 10**12 // in miliseconds
	return new Date(date.getTime() + billionSeconds)
}
