export const gigasecond = (date) => {
  const seconds = new Date(Date.parse(date) + (1000 * 1000000000));
  return seconds;
};
