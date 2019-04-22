export const gigasecond = actual => {
  const future = new Date(actual);
  future.setSeconds(actual.getSeconds() + 10 ** 9);
  return future;
};
