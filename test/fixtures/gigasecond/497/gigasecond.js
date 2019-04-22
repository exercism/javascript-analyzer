const isDate = date =>
  typeof date === 'object' && Date.prototype.isPrototypeOf(date);

const gigasecond = (date) => isDate(date) && new Date(date.getTime() + 10e11);

module.exports = {
  gigasecond
}