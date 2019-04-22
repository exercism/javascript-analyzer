export const gigasecond = (date) => {
  const giga = 1000000000000;
  const time = date.getTime();
  const gigaDate = new Date(time + giga);
  return gigaDate;
}
