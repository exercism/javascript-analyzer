export const gigasecond = (date) => {
  var gigaseconds = Math.pow(10, 9);
  var gigamilliseconds = gigaseconds * 1000;
  var newTime = date.getTime() + gigamilliseconds;
  return new Date(newTime);
}