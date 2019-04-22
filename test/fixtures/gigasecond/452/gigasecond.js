export function gigasecond(date) {
    let milliseconds = 1000000000000;
    return new Date(date.getTime() + milliseconds);
}
