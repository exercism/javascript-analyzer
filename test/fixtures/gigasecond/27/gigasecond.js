/**
 * Calculate the moment when someone has lived for 10^9 seconds.
 *
 * @param {Date} date
 * @returns {Date}
 */

// Just calculate a sum of the current date as count of milliseconds and
// milliseconds of a gigasecond
const gigasecond = date => new Date(date.getTime() + (10 ** 9) * 1000);

export { gigasecond };
