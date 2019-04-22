export const gigasecond = (initial_date) => {
  return new Date(initial_date.getTime() + (1000000000 * 1000));
}
