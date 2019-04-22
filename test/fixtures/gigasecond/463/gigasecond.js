/**
 * Returns a date a gigasecond from the passed in date.
 * @param {Date} d - starting date
 */
export const gigasecond = d =>
  new Date(d.getTime() + Math.pow(10, 12))

