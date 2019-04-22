const gigaSecond = 1000000000000;

export const gigasecond = date => new Date(
  Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds(),
  ) + gigaSecond,
);
