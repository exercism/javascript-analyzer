export const gigasecond = (date) => {
  let time = date.getTime() + 1000000000000;
  let newDate = new Date(time);
  return newDate
};