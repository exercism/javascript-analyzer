export function gigasecond(date) {
  return new Date(date.getTime() + (10 ** 12));
}
