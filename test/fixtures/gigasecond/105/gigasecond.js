export const gigasecond = (date) => {
  const ms_per_gigasecond = Math.pow(10, 12);

  // Return current date, converted to timestamp, plus milliseconds
  return new Date(+date + ms_per_gigasecond);
};
