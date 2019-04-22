export function gigasecond(date) {
  const diff = date.getTime() + (10 ** 9) * 1000;
  const date2 = new Date();

  date2.setTime(diff);
  return date2;
}
