export function gigasecond(dt) {
  return new Date(dt.getTime() + Math.pow(10,12));
}
