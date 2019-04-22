export function gigasecond(date) {
    const GIGASECOND = 1000000000;
    let oneGigaSecondLater = new Date(
        (date.getTime() / 1000 + GIGASECOND) * 1000
    );
    return oneGigaSecondLater;
}
