const GIGASECOND = 10 ** 9;

// Given a JavaScript Date
// Calculate the moment when someone has lived for 10^9 seconds
function gigasecond(birthday) {
  const result = new Date(birthday);
  result.setTime(birthday.getTime() + GIGASECOND * 1000);
  return result;
}

module.exports.gigasecond = gigasecond;
