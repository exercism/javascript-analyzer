export const gigasecond = (date) => {
    return new Date(date.setUTCSeconds(date.getSeconds() + Math.pow(10,9)));
}
