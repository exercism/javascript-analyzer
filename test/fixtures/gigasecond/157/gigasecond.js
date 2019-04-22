/*
 * A function that calculates the the moment when someone has lived for 10^9
 * seconds
 *
 * @param date a Date() object representing a person's birth
 * @return a new Date() object set to the moment they have lived 10^9 seconds
 */
export const gigasecond = date => new Date(date.getTime() + 1000000000000);
