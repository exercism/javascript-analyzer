export const gigasecond = date => {
  const time = date.getTime();
  return new Date(time + Math.pow(10, 9) * 1000);
};
