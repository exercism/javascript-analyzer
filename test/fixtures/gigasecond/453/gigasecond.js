const GIGASECOND = 1000000000; // 1 billion seconds
const COUNT_OF_MS_IN_ONE_SEC = 1000; // 1000ms in 1sec

export function gigasecond(dateObj) {
  /** Use the getTime method to retrieve the
    * number of milliseconds since this date and
    * the Unix time epoch. Then, divide it by 1,000
    * to get the number of seconds.
    */
  const dateObjInSeconds = dateObj.getTime() / COUNT_OF_MS_IN_ONE_SEC;
  // Add the date together with the gigasecond to get gigasec bday.
  const dateObjGigasecBday = dateObjInSeconds + GIGASECOND;
  // Convert the gigasec bday back to milliseconds.
  const gigasecBdayToMs = dateObjGigasecBday * COUNT_OF_MS_IN_ONE_SEC;
  /** Return new Date object, using the
    * Unix timestamp from the gigasecond bday.
    */
  return new Date(gigasecBdayToMs);
}
