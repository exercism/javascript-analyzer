export const gigasecond = date => {
  const startDate = date.getTime();
  return new Date(startDate + 1000000000000);
};
