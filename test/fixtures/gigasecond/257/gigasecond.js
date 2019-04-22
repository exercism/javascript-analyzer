export const gigasecond = date => {
    var gswm = 10 ** 12; // gigasecond with miliseconds
    var addedTime = date.getTime() + gswm;
    return new Date(date.setTime(addedTime));
}
