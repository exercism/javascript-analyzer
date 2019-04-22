export const gigasecond = (date) => {
    console.log(new Date(new Date(date).setTime(new Date(date).getTime())));
    return new Date(new Date(date).valueOf() + 1000000000000);
};