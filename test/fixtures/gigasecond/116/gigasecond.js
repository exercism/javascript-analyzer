export const gigasecond = (date) => {
  let livedSeconds = date.getTime() / 1000;
  livedSeconds += 10 ** 9;
  const nothingDate = new Date(0);
  nothingDate.setUTCSeconds(livedSeconds);
  return nothingDate;
};
