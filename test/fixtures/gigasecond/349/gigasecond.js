export const gigasecond = (date) => {
    var d = new Date(date);
    d.setSeconds(d.getSeconds() + 1000000000);
    return d;
}
