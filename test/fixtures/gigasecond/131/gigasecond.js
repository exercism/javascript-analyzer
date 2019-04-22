const gigasecond = function(startDate) {
  // Gigasecond in milliseconds = 10^(9 + 3)
  const gigaMilli = Math.pow(10, 12) * 1000;
  return new Date(startDate.getTime() + gigaMilli);
};

export {gigasecond};
