function gigasecond(time) {
    const oneGigasecond = Math.pow(10, 9)

    const result = new Date(Date.parse(time) + oneGigasecond * 1000)
    return result
}

module.exports = { gigasecond }
