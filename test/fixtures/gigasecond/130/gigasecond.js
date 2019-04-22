export function gigasecond(startDate) {
  const GIGA_SECOND =  1000 * Math.pow(10, 9);
  return new Date(GIGA_SECOND + startDate.getTime());
}
