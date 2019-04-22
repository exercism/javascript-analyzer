const gigasecondInMs = 1000000000000;
export function gigasecond(date) {
  return new Date(date.getTime() + gigasecondInMs);
}
