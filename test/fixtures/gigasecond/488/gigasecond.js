const GIGASECOND = 1000000000

function gigasecond(birthdate) {
    let birthTime = birthdate.getTime()
    let gigasecondTime = birthTime + GIGASECOND*1000

    return new Date(gigasecondTime)
}

export { gigasecond }