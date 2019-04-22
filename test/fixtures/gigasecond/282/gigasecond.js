export const gigasecond = (date) => {
  const dateInMilliseconds = date.getTime();
  const oneGigaMillisecond = Math.pow(10, 12);
  return new Date(dateInMilliseconds + oneGigaMillisecond);
};

