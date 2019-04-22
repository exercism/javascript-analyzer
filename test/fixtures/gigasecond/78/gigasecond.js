export function gigasecond(date) {
    return new Date((date.valueOf() / 1000 + 1e9) * 1000);
}
