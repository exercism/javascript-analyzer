export function gigasecond(date) {
  const gigasecondsInJs = (10 ** 9) * 1000;
  return new Date(date.getTime() + gigasecondsInJs);
}
