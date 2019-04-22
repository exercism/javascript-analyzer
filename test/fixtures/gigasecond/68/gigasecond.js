const gigasecond = start => {
    let startTimestamp = Date.UTC(
        start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDay(),
        start.getUTCHours(), start.getUTCMinutes(), start.getUTCSeconds());

    return new Date(startTimestamp + 1000000000000);
}

module.exports = gigasecond;

