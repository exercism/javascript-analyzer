const GIGA_SECOND = 1000000000;
const GIGA_MILLISECOND = GIGA_SECOND * 1000;

export const gigasecond = date => new Date(date.valueOf() + GIGA_MILLISECOND);
