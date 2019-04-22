export const gigasecond = (dob) => {
  const seconds = 1000000000 + dob.getSeconds();

  if (dob.getFullYear() < 1970) {
    dob.setHours(dob.getHours() - 1);
  }

  dob.setSeconds(seconds);

  return dob;
};
