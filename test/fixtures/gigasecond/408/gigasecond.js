/* eslint-disable arrow-parens */
// first set up some constants for seconds in min hour, day, month year
// modulo and remainder your way to the result
// PROFIT!

// calculate how many years to add
// calculate days
// calculate hours
// calc seconds

const GIGASEC = 1000000000;

export const gigasecond = date => {
  const dateWithGigaseconds = date.getSeconds() + GIGASEC;
  date.setSeconds(dateWithGigaseconds);
  return date;
};
