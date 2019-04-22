export const gigasecond = (date) => {
  const aGigasecondInMilliseconds = (10 ** 9) * (10 ** 3);
  return new Date(date.getTime() + aGigasecondInMilliseconds);
};
