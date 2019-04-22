export function gigasecond (d) {
  return new Date(new Date(d).getTime() + 10 ** 12)
}
