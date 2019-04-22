export const  gigasecond = (date) => {
    // A gigasecond is 10^9 (1,000,000,000) seconds.
    const gigasecond = Math.pow(10,9);

    // Convert date arg to seconds
    const seconds = date.getTime() / 1000;
    
    // Add gigasecond to converted arg
    const gigaDate = seconds + gigasecond;

    //convert back to milliseconds and return new Date
    return new Date(gigaDate * 1000);
}
