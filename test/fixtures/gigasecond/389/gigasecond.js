const gsecond = 1000000000000; // in miliseconds

export const gigasecond = (date) => {
  return new Date(date.getTime() + gsecond);
}