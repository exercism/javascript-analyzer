export const gigasecond = (startDate) => {
  const gs = 1000000000;
  const startDateInSeconds = startDate.getTime() / 1000;
  const futureDateInSeconds = startDateInSeconds + gs;
  return new Date(futureDateInSeconds * 1000);
};
