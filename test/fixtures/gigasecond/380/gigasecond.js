// Calculate the moment when someone has lived for 10^9 seconds.
// A gigasecond is 10^9 (1,000,000,000) seconds.
export const gigasecond = (startDate) => {
  const startTime = startDate.getTime();
  const diffTime = 10 ** (9 + 3); // miliseconds
  const endTime = startTime + diffTime;
  const endDate = new Date(endTime);
  return endDate;
};
