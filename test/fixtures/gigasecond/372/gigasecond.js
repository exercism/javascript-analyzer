export const gigasecond = (d) => {
  var diff = 1000000000;
  // before the epoch
  if (d.getYear() < 60) {
    diff = diff - 3600;
  }
  d.setSeconds(d.getSeconds() + diff);
  return d;
}
