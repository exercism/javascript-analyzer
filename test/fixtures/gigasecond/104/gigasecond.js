export const gigasecond = (birthday) => {
	const GSEC = Math.pow(10, 9);
	const ms = 1000;

	// Return date that a person will reach a "gigasecond" of age
	return new Date(birthday.getTime() + (GSEC * ms));
}