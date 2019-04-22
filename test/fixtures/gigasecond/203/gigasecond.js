export const gigasecond = date => {
    // since we need to add 10^9 seconds to current date, we can just sum it
    // after we get the current second count. 
    // Then we convert to UTC time for the testing suite
    return new Date(date.setUTCSeconds(date.getSeconds() + Math.pow(10, 9)));
};
