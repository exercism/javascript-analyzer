export const gigasecond = (date) => {
  date.setUTCSeconds(date.getUTCSeconds() + 1000000000);
  return date;
};
