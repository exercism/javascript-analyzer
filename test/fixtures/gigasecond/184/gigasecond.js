export function gigasecond(date) {
  const bornTimestamp = date.getTime();
  return new Date(bornTimestamp + 10**12);
}