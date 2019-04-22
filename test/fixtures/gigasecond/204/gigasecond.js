/*
  gigasecond takes a Date object and adds 1 000 000 000 seconds to it
  returns a Date object
*/

export function gigasecond(d) {
  return new Date(d.setSeconds(d.getSeconds() + 1000000000));
}
