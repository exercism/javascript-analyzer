// convert the input date and gigasecond to milliseconds, add, pass to new Date, return
export const gigasecond = date => new Date(date.getTime() + Math.pow(10, 9) * 1000);