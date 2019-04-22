export const gigasecond = birthday =>
  new Date((1000000000 + birthday.getTime() / 1000) * 1000);
