const GIGA_SEC = 10 ** 9;

export const gigasecond = date => new Date(date.getTime() + (GIGA_SEC * 1000));
