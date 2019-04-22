const gigasecond = time => {
  const seconds = new Date(time).getTime() / 1000;
  const gigasecond = 1e9;
  const difference = new Date((seconds + gigasecond) * 1000);
  return new Date(difference);
}

//take the .getTime() and divide by 1000 to get the seconds since 1970. 

module.exports = {
  gigasecond
};