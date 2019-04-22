const secondsCoefficient = 1000;
const momentInSeconds = 1000000000;

export const gigasecond = (date) => {
    var seconds = date.getTime() / secondsCoefficient + momentInSeconds;
    return new Date(seconds * secondsCoefficient)
}
