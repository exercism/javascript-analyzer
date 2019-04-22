export const gigasecond = (time) => {
    return new Date(time.getTime() + Math.pow(10,12)); // 10^9 seconds = 10^12 milliseconds
}