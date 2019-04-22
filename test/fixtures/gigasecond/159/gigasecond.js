export function gigasecond(dob) {
  return new Date(new Date(dob).getTime() + 1e12);
}
