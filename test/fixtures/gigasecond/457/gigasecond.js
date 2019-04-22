const oneGigasecond = 1e9
const toMilliseconds = seconds => seconds * 1000

export const gigasecond = date => new Date(date.getTime() + toMilliseconds(oneGigasecond))
