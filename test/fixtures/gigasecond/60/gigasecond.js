export function gigasecond(date) {
	let startTime = date.getTime();
  let endDate = new Date(startTime + 1000000000000);
	return endDate;
}
