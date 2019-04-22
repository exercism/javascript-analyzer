export function gigasecond(date) {
  const time = date.getTime();
  const gs = (10 ** 9) * 1000;

  return new Date(time + gs);
}
