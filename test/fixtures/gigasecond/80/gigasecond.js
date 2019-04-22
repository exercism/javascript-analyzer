function parseISOString(s) {
  var b = s.split(/\D+/);
  return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
}

export function gigasecond(date) {
  let bDate = new Date(date);

  bDate.setSeconds(bDate.getSeconds() + 40);
  bDate.setMinutes(bDate.getMinutes() + 46);
  bDate.setHours(bDate.getHours() + 1);
  bDate.setDate(bDate.getDate() + 11574);
  bDate = bDate.toISOString();

  return parseISOString(bDate);
}
