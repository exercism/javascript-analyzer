export const gigasecond = function (date) {

    let x = (1000000000 * 1000) + date.getTime();
    return new Date(x);
}