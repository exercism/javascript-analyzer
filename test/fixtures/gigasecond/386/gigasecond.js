export const gigasecond = (date) => {
  let gs = Math.pow(10,9);
  return new Date(date.getTime() + gs*1000);
};