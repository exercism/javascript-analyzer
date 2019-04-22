export const gigasecond = (date)=> {
  return new Date(Date.parse(date) + (10**9)*1000)
}

