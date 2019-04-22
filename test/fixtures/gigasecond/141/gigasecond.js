const GIGASECOND_IN_MILLIS = 1e9 * 1e3;

export const gigasecond = (time) => {
  const birthTime = time.getTime();
  return new Date(birthTime + GIGASECOND_IN_MILLIS);
};
