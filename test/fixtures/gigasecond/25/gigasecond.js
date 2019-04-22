export const gigasecond = (birthDate) => {
  const gsMilli = 1e9 * 1e3
  const birthDateMilli = birthDate.getTime()
  return new Date(gsMilli + birthDateMilli)
}
