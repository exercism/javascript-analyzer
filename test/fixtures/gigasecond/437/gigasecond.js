export function gigasecond(startDate) {
  const msToAdd = 10 ** 12; // milliseconds == 10**9 gigaseconds
  const endDate = new Date(startDate.getTime() + msToAdd);
  return endDate;
}
