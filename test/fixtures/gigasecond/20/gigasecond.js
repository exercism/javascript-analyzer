export const gigasecond = (date) => {
    return new Date((1000*1000000000) + date.getTime());
}