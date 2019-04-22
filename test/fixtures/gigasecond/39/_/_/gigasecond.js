const GIGASECOND = 1000000000;

export const gigasecond = (date) => {
  date.setSeconds(date.getSeconds() + GIGASECOND);
  return date;
};
