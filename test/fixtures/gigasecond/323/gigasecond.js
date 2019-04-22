export const gigasecond = (date) => {
    var seconds = date.getTime()
    var seconds = seconds + 1000000000000
    return new Date(seconds)
}