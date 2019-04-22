export const gigasecond = (input) => {

    // number of milliseconds in a gigasecond
    let gs = Math.pow(10, 12);

    return new Date(Date.parse(input) + gs);
}