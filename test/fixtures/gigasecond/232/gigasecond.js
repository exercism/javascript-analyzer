export const gigasecond = (givenDate) => {
  const pow = 10 ** 12;
  const resultDate = new Date(givenDate.getTime() + pow);
  return resultDate;
};
