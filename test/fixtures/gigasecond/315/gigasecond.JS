export const gigasecond = date => {
	const gs = Math.pow(10,12) // gigasecond to miliseconds
	return new Date(date.getTime() + gs)
}