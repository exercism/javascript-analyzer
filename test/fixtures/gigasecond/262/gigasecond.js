/* eslint-disable semi */
export function gigasecond(time) {
  const initialTime = time.getTime()
  const gigasecondAnniversary = initialTime + 10e11
  return new Date(gigasecondAnniversary)
}