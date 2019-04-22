export const gigasecond = dob => (
  new Date(dob.setSeconds(10 ** 9))
);
