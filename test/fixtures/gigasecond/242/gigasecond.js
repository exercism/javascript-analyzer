
export const gigasecond = (value) => {
  return new Date(value.getTime() + (Math.pow(10, 9) * 1000))
}