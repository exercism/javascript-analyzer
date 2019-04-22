export const gigasecond = date => new Date((((date.getTime() / 1000) + Math.pow(10, 9)) * 1000));
