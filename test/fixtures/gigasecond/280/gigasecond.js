export const gigasecond = date => {
    date.setSeconds(date.getSeconds() + 1000000000)
    return date
}