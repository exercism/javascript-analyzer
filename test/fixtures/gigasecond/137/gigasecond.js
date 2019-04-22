export const gigasecond = (date) => {
  return new Date(date.getTime() + (1000 * Math.pow(10, 9)));
}
