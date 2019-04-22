'use strict'
// Calculate the moment when someone has lived for 10^9 seconds.
// A gigasecond is 10^9 (1,000,000,000) seconds.

// We pass a Date object as a parameter, and return the corresponding Date object 10^9 seconds later. 
export const gigasecond = date => new Date(date.getTime() + (1e12));