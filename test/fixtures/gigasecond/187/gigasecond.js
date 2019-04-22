export const gigasecond = (date) => {
  const gigasecond = Math.pow(10, 9);
  const epochDate = date.getTime() / 1000;
  return new Date((epochDate + gigasecond) * 1000);
};
