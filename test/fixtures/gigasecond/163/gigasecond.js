export function gigasecond(date) {
  return new Date(date.getTime() + 1e9 * 1e3)
}
