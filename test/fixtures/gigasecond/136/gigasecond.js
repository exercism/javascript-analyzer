export const gigasecond = (date) => {
    var seconds = date.getSeconds();
    date.setSeconds(seconds + 1000000000);
    return date;
}