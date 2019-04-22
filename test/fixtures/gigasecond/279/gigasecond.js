export const gigasecond = (utcDate) => {
    var past = Date.parse(utcDate);
    var future = (past/1000) + 1000000000;
    return new Date(future*1000);
}