/* eslint-disable linebreak-style */
export function gigasecond(indate) {
  const GIGASECOND = 10 ** 12;
  const outDate = new Date(
    indate.getTime() + GIGASECOND,
  );
  return outDate;
}
