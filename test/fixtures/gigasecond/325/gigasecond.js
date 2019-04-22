const gigasecond = (date) => {
  const gigaMillisecond = 10**9 * 1000;
  const epochTime = date.getTime();

  return new Date(epochTime + gigaMillisecond);
};

export { gigasecond };
