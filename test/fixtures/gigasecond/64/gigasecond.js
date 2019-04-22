
// Calculates the date and time someone has lived for 10^9(seconds) * 10^3(milliseconds).
export function gigasecond(birth) {
	birth.setTime(birth.getTime() + Math.pow(10, 12));
	return birth;
}

