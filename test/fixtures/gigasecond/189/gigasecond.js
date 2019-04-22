const BILLION = Math.pow(10, 9);

const gigasecond = (originalDate) => {
    const originalSeconds = originalDate.getTime() / 1000;
    const newSeconds = originalSeconds + BILLION;
    return new Date(newSeconds * 1000);
};

export { gigasecond };