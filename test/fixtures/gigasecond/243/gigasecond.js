function gigasecond(date = new Date()) {
  // one Gigasecond = 10 to the power 9 seconds
  const oneGS = 10 ** 9;

  // add one giga seconds to current date
  date.setSeconds(date.getSeconds() + oneGS);

  // modified date
  return date;
}

module.exports = {
  gigasecond,
};
