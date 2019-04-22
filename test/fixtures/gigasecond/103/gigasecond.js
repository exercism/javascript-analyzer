export function gigasecond(date) {
  return new Date(date.getTime() + Math.pow(10, 12)); //10^12 gigasecond in milliseconds
}
