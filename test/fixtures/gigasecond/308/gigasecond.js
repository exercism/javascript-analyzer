export const gigasecond = date => {
    if (date < new Date(Date.UTC(1970, 1, 1, 0, 0, 0))) {
        date.setSeconds(date.getSeconds() + ((10 ** 9) - 3600));
    } else {
        date.setSeconds(date.getSeconds() + (10 ** 9));
    }
    return date;
}
