export const gigasecond = (date) => {
    let d = new Date()
    d.setTime(date.getTime() + 1000000000000)
    return d
}