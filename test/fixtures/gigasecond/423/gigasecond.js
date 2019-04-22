export function gigasecond(inputDate) {
  return new Date(inputDate.setUTCSeconds(inputDate.getUTCSeconds() + 1e9));
}
