const GS = Math.pow(10, 9)

export const gigasecond = (date) => {
  date.setSeconds(date.getSeconds() + GS)

  return date
}
