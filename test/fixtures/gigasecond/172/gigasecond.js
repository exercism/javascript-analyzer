export const gigasecond = (date) => {
    let gigasecond = 1000000000
    let seconds = date.getTime() / 1000
    let gigasecondDate = seconds + gigasecond
    return new Date(gigasecondDate * 1000)
}