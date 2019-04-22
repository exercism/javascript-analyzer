export function gigasecond(date) {
  const gs = 10**(9+3);
  const moment = date.getTime() + gs;
  return new Date(moment);
}