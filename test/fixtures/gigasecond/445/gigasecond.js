
export const gigasecond = (inputDate) => {
  const gs = 1e9;
  const ms = gs * 1000;
  return new Date(inputDate.valueOf() + ms);
};
