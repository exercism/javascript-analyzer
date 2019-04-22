export function gigasecond(date) {
  const oneGigaSecond = 1000000000;
  const datePlusOneGigaSecond = date.getSeconds() + oneGigaSecond;
  return new Date(date.setSeconds(datePlusOneGigaSecond));
}
