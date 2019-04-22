export const gigasecond = (date) => {
    let x = new Date((date.getTime() / 1000 + 1000000000) * 1000)
    return x  
}
