export function gigasecond(date) {
  // 1000000000000 is 1000 x 10^9
  const dateAfterGigaSecond = new Date(new Date(date).getTime() + 1000000000000);

  return new Date(Date.UTC(
    dateAfterGigaSecond.getUTCFullYear(),
    dateAfterGigaSecond.getUTCMonth(),
    dateAfterGigaSecond.getUTCDate(),
    dateAfterGigaSecond.getUTCHours(),
    dateAfterGigaSecond.getUTCMinutes(),
    dateAfterGigaSecond.getUTCSeconds(),
  ));
}
