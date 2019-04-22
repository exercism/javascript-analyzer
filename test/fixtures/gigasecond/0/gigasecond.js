export const gigasecond = (date) => {
    const gs = 1e9 * 1e3;
    let dateSeconds = date.getTime();
    return new Date(dateSeconds + gs)
};