export const gigasecond = (d) => {
  return new Date(d.valueOf() + Math.pow(10, 12));
}
