export const gigasecond = date => {
  return new Date(Date.parse(date) + 1e12);
}