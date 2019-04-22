export const gigasecond = (dateOfBirth) => {
  dateOfBirth.setUTCSeconds(dateOfBirth.getSeconds() + 1000000000);
  return dateOfBirth;
};
