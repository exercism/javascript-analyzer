export const gigasecond = (birthdate) => {
  birthdate.setTime(birthdate.getTime() + Math.pow(10, 9) * 1000)
  // birthdate.setSeconds(birthdate.getSeconds() + giga);    // doesn't work before epoch time

  return birthdate
}
