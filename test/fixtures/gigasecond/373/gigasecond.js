export const gigasecond = (birthdate) => {
  const gigadate = birthdate;
  gigadate.setTime(birthdate.getTime() + 1000000000000);
  return gigadate;
};
