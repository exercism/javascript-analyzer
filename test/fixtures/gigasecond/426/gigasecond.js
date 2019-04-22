export const gigasecond = date =>
  new Date(date.setTime(date.getTime() + 10 ** 12));
