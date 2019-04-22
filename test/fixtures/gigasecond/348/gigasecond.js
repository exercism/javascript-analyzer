export const gigasecond = birthday => {
    var gigadate, milli;
    milli = Date.parse(birthday) + 1000000000000;
    gigadate = new Date(milli);
    return gigadate;
}