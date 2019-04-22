export const gigasecond = (date) => {
  const dateMs = date.getTime() + 1000000000000;
  return new Date(dateMs);
};