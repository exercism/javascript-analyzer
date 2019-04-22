function gigasecond(date) {
  const GIGASECOND = 10 ** 9;
  return new Date(date.getTime() + GIGASECOND * 1000);
}

export { gigasecond };
