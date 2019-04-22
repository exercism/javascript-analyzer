export const gigasecond = (data) => {
  return new Date(data.getTime() + 1000000000000)
  //Date.UTC(2015, 8, 14)-1000000000000
}
