let gigasecond = (date) => {
	return new Date(date.getTime() + Math.pow(10,12));
}

export { gigasecond }