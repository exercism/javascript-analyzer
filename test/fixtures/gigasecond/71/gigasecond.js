

export const gigasecond = (birthDate) => {
  const birthTime = birthDate.getTime();
  const giga = 1e3 * 1e9;
  return new Date(birthTime + giga);
};