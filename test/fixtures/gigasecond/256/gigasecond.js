export const gigasecond = (date) => {
  const copy = new Date(date);
  copy.setUTCSeconds(date.getUTCSeconds() + 1e9);
  return copy;
};
