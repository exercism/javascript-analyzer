export const gigasecond = (date) => {

  var dt = date;
  dt.setUTCSeconds(dt.getUTCSeconds() + 1000000000)

  return date;

}
