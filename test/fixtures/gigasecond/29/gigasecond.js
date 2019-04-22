export const gigasecond = (time) => {
    let t = new Date(time)
    t.setUTCSeconds(t.getUTCSeconds() + 10 ** 9)
    return t
}