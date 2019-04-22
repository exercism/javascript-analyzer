export const gigasecond = (birthday) => {
  var gs = new Date(birthday.toString())
  gs.setUTCSeconds(gs.getUTCSeconds() +1000000000)
  return gs
};
