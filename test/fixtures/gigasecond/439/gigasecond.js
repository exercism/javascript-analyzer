const convertToMilliseconds = date => Date.parse(date.toUTCString());
const gigaSecond = 1000000000;
export const gigasecond = date => new Date((gigaSecond * 1000) + convertToMilliseconds(date));
