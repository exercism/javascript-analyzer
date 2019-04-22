// Returns the moment when someone has lived for 10^9 seconds (one gigasecond)
export const gigasecond = dateObj => new Date(dateObj.getTime() + Math.pow(10,12));