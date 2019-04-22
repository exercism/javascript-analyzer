const gs = 1e9;
const toMilliseconds = seconds => seconds * 1000;

export function gigasecond(date) {
  return new Date(date.getTime() + toMilliseconds(gs));
}
