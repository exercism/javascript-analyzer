export const gigasecond = (birthdate) => {
	return new Date(Date.parse(birthdate) + Math.pow(10, 12));
}