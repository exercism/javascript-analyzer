export const gigasecond = (bornDate) => {
  const gs = 10 ** 9;
  bornDate.setSeconds(bornDate.getSeconds() + gs);
  return bornDate;
};
