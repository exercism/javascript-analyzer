export function gigasecond(birth) {
    return new Date(birth.getTime() + 1e12);
}