export function gigasecond(date) {
  const gigseconds = 10 ** 9;
  const gs = new Date(date.toString());
  const result = new Date(gs.setUTCSeconds(gs.getUTCSeconds() + gigseconds));

  return result;
}
