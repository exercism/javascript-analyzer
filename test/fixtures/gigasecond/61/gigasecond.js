export const gigasecond = (date) => {
    // convert milliseconds to seconds
    const currentUnixTimestamp = Math.floor(date.getTime() / 1000);
    const gigaSeconds = Math.pow(10, 9);
    // convert back  to milliseconds before parsing
    return new Date((currentUnixTimestamp + gigaSeconds) * 1000);
};

