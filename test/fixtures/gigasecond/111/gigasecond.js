/*
  Calculate the moment when someone has lived for 10^9 seconds.
  A gigasecond is 10^9 (1,000,000,000) seconds.
*/
export const gigasecond = function(date) {
  let gigsec = 10**9;  // seconds
  let gigmsec = gigsec * 1000; // milliseconds
  return new Date(date.valueOf() + gigmsec);  // future moment...
}