const MILISECONDS_TO_LIVE = 1000000000000;
export const gigasecond = startDate =>
  new Date(startDate.getTime() + MILISECONDS_TO_LIVE);
