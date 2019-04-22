const GS = 10 ** 9;

export function gigasecond(input) {
  const startDate = input.getTime();
  const endDate = new Date(startDate + GS * 1000);
  return endDate;
}
