export const gigasecond = date => {
  	let secondsMore = Math.pow(10,9)
  	let newDate = new Date(date.getTime() + secondsMore * 1000)
  	return newDate
}