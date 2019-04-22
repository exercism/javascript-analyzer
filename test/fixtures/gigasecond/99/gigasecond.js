// gigasecond implements the Gigasecond programming exercise.
//
// Given a date, return a new date that is exactly a gigasecond greater
// than that given.

// A gigasecond (billion seconds)
const gsec = 1000000000;

// Exported function object that adds a gigasecond to a given date.
export const gigasecond = (inDate) => {
  inDate.setUTCSeconds(inDate.getUTCSeconds() + gsec);
  return inDate;
};
