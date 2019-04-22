export const gigasecond = (date) => {
	const gSec = 1000 * 1000000000
  return new Date(date.getTime() + gSec)
}
