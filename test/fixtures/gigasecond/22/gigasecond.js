const gigasecond = (date) => {
  let timeStamp = date.getTime();
  timeStamp += 1000000000 * 1000;
  return new Date(timeStamp);
};

export { gigasecond };
