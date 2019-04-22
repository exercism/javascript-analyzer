function gigasecond(given) {
  const gs = new Date(1000000000 * 1000);
  return new Date(given.getTime() + gs.getTime());
}

module.exports = {
  gigasecond: gigasecond
}
