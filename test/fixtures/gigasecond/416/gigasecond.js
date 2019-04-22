export const gigasecond = date => (
  new Date(Date.parse(date) + (10 ** 12))
);
