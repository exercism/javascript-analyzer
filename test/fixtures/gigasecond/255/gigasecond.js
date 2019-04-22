export const gigasecond = (date) => {

  const gigasecond = 1000000000

  const gigasecond_in_milliseconds = gigasecond * 1000

  let date_gigasecond_later = new Date(date.getTime() + gigasecond_in_milliseconds)

  return date_gigasecond_later
}
