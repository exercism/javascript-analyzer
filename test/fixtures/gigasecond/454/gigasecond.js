export function gigasecond(dateInTime) {
  return new Date(dateInTime.getTime() + (Math.pow(10, 12)))
}