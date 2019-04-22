export const gigasecond = (gs) => {
    let miliseconds = 1000000000 * 1000;
    return new Date(gs.getTime() + miliseconds);
}