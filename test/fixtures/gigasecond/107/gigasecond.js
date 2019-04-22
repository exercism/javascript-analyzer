export const gigasecond = (date) => {
  const startTime = date.getTime(); // time in milliseconds since Unix Epoch
  const gsLater = new Date(startTime + 1000000000000)
  return gsLater;
}