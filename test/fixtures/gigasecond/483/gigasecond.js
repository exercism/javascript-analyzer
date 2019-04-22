export const gigasecond = dateObj =>
  new Date(dateObj.getTime() + Math.pow(10, 12))
