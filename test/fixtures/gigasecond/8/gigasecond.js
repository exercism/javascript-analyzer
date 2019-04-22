export const gigasecond = (input) => {
    let timeInSeconds = input.getTime() / 1000;
    let gsDate = timeInSeconds + Math.pow(10, 9);
    return new Date(gsDate * 1000);
}