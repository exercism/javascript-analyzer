export const gigasecond = (date) => {
    date.setTime(date.getTime() + 10**9 * 1000)
    return date
}
