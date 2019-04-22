export const gigasecond = dateOfBirth => {
  const birthTime = dateOfBirth.getTime();
  return new Date(birthTime + 1000000000000);
};
