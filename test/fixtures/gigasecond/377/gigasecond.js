const GIGA_SECONDS = (10 ** 9) * 1000;

export const gigasecond = d => new Date(d.getTime() + GIGA_SECONDS);
