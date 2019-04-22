export const gigasecond = (date) => {
  let newDate = new Date(date);
  newDate.setSeconds(date.getSeconds() + 1000000000);
  return newDate;
};
