/**
 * Calculates the moment when someone has lived for 10^9 seconds.
 * @param {Date} date The initial date
 * @return {Date} The date when that person is 10^9 seconds old
 */

export const gigasecond = (date) => {
  let startDate = new Date(date);
  const secondsToAdd = startDate.getUTCSeconds() + 1000000000;
  return new Date(startDate.setUTCSeconds(secondsToAdd));
};