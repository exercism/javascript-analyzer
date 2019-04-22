export const gigasecond = (start_date) => {
  return new Date(start_date.getTime() + Math.pow(10,12));
}
