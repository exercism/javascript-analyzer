const gs = 1e9;
const toMilliseconds = seconds => seconds * 1000;

export function gigasecond(date) {
    return new Date(date.getTime() + toMilliseconds(gs));
}

/*

Calculate the moment when someone has lived for 10^9 seconds.
A gigasecond is 10^9 (1,000,000,000) seconds.

*/