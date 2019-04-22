export const gigasecond = (date) => {
  var datetime = date.getTime();
  return new Date(datetime + 1000000000000)
}
