export const gigasecond = (date) => {
  let gigdate = date;
  gigdate = new Date(date.getTime() + 1000000000000);

  return gigdate;
};
