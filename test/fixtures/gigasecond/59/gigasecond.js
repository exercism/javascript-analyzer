const GIGASECOND_MS = 1000000000 * 1000;

export const gigasecond = (date) => {
    const timestamp = date.getTime();
    
    return new Date(timestamp + GIGASECOND_MS);
}
