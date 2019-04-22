export const gigasecond = dateOfBirth => {
  return new Date(dateOfBirth.getTime() + 1e9 * 1e3);
};
