function gigasecond(bornDate) {
  return new Date(bornDate.getTime() + Math.pow(10, 12));
}

export { gigasecond };
