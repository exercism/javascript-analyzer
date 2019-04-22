const gigasecond = (date) =>{
  return new Date(date.getTime() + 1000000000000);
};

module.exports = {
  gigasecond,
};
