export const gigasecond = (birthdate) => {
  // convert seconds to milliseconds
  const convertedGS = (10 ** 9) * 1000;
  const convertedBD = Date.parse(birthdate);
  return new Date(convertedBD + convertedGS);
};
