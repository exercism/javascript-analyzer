export const gigasecond = (date) => {
  return new Date(date.setUTCSeconds(date.getUTCSeconds() + Math.pow(10, 9)));
}
