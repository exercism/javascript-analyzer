function gigasecond(date) {
  const giga = new Date();
  giga.setTime(date.getTime() + (1000000000000));
  return giga;
}

module.exports = gigasecond;
