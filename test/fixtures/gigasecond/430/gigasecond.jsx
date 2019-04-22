
export const gigasecond = (birthdate) => {
  const unixBirthdate = birthdate.getTime();
  const unixGigabirthday = unixBirthdate + 1000000000000;
  const gigabirthday = new Date(unixGigabirthday);
  return gigabirthday;
};
