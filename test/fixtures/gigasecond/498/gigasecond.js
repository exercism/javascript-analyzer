/**
 * A gigasecond is 10^9 (1,000,000,000) seconds.
 */

const numMilliseconds = 1000000000000;

const gigasecond = (_date) => {
  const resultTemp = _date.getTime() + numMilliseconds;
  return new Date(resultTemp);
};

export {
  gigasecond,
};
