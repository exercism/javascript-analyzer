const GIGA_SECOND = 10 ** 9;

export function gigasecond(startDate) {
  const startTime = startDate.getTime();
  const timeSpan = secondsToMilliseconds(GIGA_SECOND);
  const endTime = startTime + timeSpan;
  return new Date(endTime);
}

function secondsToMilliseconds(seconds) {
  return seconds * 1000;
}
