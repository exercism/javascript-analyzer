const gigasecondInSeconds = 10 ** 9;
const gigasecondInMilliseconds = gigasecondInSeconds * 1000;

export const gigasecond = date => new Date(date.getTime() + gigasecondInMilliseconds);
