export const gigasecond = (dateOfBirth) => {
  const birthDate = dateOfBirth.getTime();

  return new Date(birthDate + (1e9 * 1e3));
};