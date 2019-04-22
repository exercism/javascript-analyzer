export const gigasecond = (date) => {
    const oneGigasecond = getOneGigasecond();
    const secondsToAdd = date.getSeconds() + oneGigasecond;
    const newDate = addSecondsToCurrentDate(date, secondsToAdd);
    return newDate;
}

const getOneGigasecond = () => {
    return Math.pow(10, 9);
}

const addSecondsToCurrentDate = (date, secondsToAdd) => {
    return new Date(date.setSeconds(secondsToAdd));
}