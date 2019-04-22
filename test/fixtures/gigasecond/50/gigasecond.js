export const gigasecond = (someTime) => {
  return new Date(someTime.getTime() + Math.pow(10, 12))
};