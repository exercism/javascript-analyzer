export function gigasecond(date) {
  const millisecondOffset = Math.pow(10,12);
  return new Date(date.getTime() + millisecondOffset);
}