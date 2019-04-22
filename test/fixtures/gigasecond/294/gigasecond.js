const GIGASECOND = Number.parseInt('1000000000');

export const gigasecond = date => {
    if (!date || !date.getTime) {
        throw 'Invalid date';
    }
    return new Date(date.getTime() + 1000 * GIGASECOND);
};
