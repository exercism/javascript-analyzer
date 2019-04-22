export function gigasecond(from) {
    return new Date((from.valueOf() + Math.pow(10, 9) * 1000));
}