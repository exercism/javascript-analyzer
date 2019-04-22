function gigasecond(date) {
    const leapMS = Math.pow(10, 12);
    const newDate = new Date(+date + leapMS);

    return newDate;
}

export { gigasecond };
