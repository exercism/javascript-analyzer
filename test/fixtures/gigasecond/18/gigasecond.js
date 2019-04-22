export const gigasecond = startTime => {
    const birthday = Date.parse(startTime);
    const gigasecond = birthday + 1000000000000;
    const celebration = new Date(gigasecond);
    
    return celebration;
}