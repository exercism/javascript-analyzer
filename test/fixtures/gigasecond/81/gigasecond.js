export const gigasecond = (date) => {
    const startSeconds = date.getTime();
    const timeLived = 10 ** 12;
    const totalSeconds = startSeconds + timeLived;
    return new Date(totalSeconds);
}
