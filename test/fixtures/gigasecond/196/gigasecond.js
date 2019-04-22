export const gigasecond = (date) => {
  const start = date.getTime();
  return new Date(start + 1000000000000);
};
