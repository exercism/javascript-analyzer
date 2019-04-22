export const gigasecond = (date) => {
  return new Date(date.setSeconds(date.getSeconds() + 1000000000));
}