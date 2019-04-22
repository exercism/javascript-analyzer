export const gigasecond = (start) => {
  const original = Date.parse(start);
  return new Date(original + (1000 * 1000000000));
};
