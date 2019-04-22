export function gigasecond(fromDate) {
  const newDate = new Date(fromDate.getTime());
  newDate.setSeconds(newDate.getSeconds() + (10 ** 9));
  return newDate;
}
