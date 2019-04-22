export function gigasecond (gs) {
  var gigasec = new Date(gs);
  gigasec.setSeconds(gigasec.getSeconds() + 1000000000);
  return gigasec;
}

