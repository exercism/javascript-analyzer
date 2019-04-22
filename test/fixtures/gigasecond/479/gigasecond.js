
export function gigasecond(date) {
	var t = date.getTime();
    return new Date(t + 1000000000000);
}