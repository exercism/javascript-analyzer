export function gigasecond(birthday) {
  const sec = 1000000000;
  return new Date(birthday.getTime() + sec * 1000);
}
