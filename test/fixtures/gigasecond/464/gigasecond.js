export function gigasecond(inputDate) {
    return new Date(inputDate.getTime() + (10 ** 12));
}
