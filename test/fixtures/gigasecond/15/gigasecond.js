function gigasecond(entryDate) {
  return new Date(entryDate.getTime() + 1e12);
}

export { gigasecond };
