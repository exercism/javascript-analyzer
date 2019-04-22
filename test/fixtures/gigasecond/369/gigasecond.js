export const gigasecond = inputDate => {
  // First we'll convert the date to seconds
  let dateInSecs = inputDate.getTime() / 1000;
  // Then we add 10^9 seconds
  dateInSecs += 10 ** 9;
  // Then we can convert the date back to a Date object
  return toDate(dateInSecs);
};

const toDate = secs => {
  const date = new Date(0);
  date.setUTCSeconds(secs);
  return date;
};
