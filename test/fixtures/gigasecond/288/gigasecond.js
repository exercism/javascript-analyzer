export const gigasecond = (date) => {
  if (date < Date.UTC(1970, 1, 1)) {
    date.setSeconds(date.getSeconds() - 3600);
  }
  date.setSeconds(date.getSeconds() + 1000000000);
  return date;
};
