export const gigasecond = (date) => {
    return new Date(date.setMilliseconds(date.getMilliseconds() + Math.pow(10, 12)));
};