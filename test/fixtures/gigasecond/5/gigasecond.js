export const gigasecond = function (start) {
    //declaring starting point and number of seconds (converted to milliseconds)
    let startDate = new Date(start);
    let add = 1000000000 * 1000;

    //converting starting date to milliseconds and adding 10^9 seconds
    let dateinMilli = startDate.getTime();
    let finalSeconds = dateinMilli + add;

    //converting final number of milliseconds to a date and returning it
    let finalDate = new Date(finalSeconds);
    return finalDate;
}

