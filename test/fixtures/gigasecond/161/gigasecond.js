export const gigasecond = (birthday) => {
  return new Date(birthday.getTime() + Math.pow(10, 12));
}
