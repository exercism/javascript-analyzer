export function gigasecond(date) {
  let dateInMilliseconds = date.getTime();
  return new Date(dateInMilliseconds + 10**12)
}
