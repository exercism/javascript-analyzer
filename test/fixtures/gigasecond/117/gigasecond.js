const gigasecond = (date) => {
  const gigaInMilliseconds = Math.pow(10,12)
  return new Date(gigaInMilliseconds + date.getTime())
}

export {gigasecond}
