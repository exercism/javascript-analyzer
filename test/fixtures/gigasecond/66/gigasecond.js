function gigasecond(value) {
    let dateInMilliseconds = new Date(value).getTime();
    let aGigasecondInMilliseconds = 1000000000 * 1000;
    let aGigasecondLater = dateInMilliseconds + aGigasecondInMilliseconds;
    return new Date(aGigasecondLater);
}

export { gigasecond };