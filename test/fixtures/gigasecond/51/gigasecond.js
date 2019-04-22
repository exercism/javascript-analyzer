export const gigasecond = (date) => {
    var n = date.getTime() + 1000000000 * 1000;
    return new Date(n);
}