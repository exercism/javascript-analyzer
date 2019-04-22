// Exercise:   Gigasecond
// Iteration:  01

function gigasecond(date) {
  const giga = 1000000000;

  return new Date(date.getTime() + (1000 * giga));
}

module.exports = gigasecond;
