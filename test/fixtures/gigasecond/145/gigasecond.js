export const gigasecond = date => {
  return new Date(date.setSeconds(date.getSeconds() + Math.pow(10, 9)));
};
