const oneGigaSecond = 1e9;

function gigasecond(moment) {
  return new Date(moment.getTime() + oneGigaSecond * 1000);
}

export { gigasecond };
