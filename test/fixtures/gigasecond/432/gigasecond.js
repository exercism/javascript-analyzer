function gigasecond(dateObject){
  const MILLISECONDS = 1000000000000;
  return new Date(dateObject.setTime(dateObject.getTime() + MILLISECONDS));
}

module.exports = {
  gigasecond: gigasecond,
};
