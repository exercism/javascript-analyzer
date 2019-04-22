export const gigasecond = (date) => {
    const milliseconds = date.getTime();
    const newDate = milliseconds + 1000000000000;
    return new Date(newDate);

};