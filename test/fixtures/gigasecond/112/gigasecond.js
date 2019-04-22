export const gigasecond = (date) => {
  const unixTimestamp = parseInt((date.getTime() / 1000).toFixed(0));
  const gigaSecondResult = unixTimestamp + Math.pow(10, 9);
  return new Date(gigaSecondResult * 1000);
}
