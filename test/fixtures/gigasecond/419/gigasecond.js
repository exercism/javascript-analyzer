export const gigasecond = (input) => {
  // Convert input date to milliseconds
  const startDate = input.getTime();

  // Gigaseconds in milliseconds
  const giga = 10 ** 12;

  return new Date(startDate + giga);
};
