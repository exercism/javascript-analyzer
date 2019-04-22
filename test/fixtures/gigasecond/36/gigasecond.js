function gigasecond(date) {
    const gigInMilli = 10**12;
    return new Date(date.getTime() + gigInMilli);
}

module.exports = { gigasecond };
