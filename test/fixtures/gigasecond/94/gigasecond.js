export function gigasecond(dateOfBirth) {
  return new Date(dateOfBirth.getTime() + 1e12);
}
