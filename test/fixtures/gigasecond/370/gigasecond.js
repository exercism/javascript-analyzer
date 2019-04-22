export const gigasecond = date =>
    new Date(date.setSeconds(date.getSeconds() + Math.pow(10, 9)));