export const gigasecond = (input) => {
    //var giga = 1000000000;
    var newDate = new Date(input.getTime() + 1000000000*1000);
    return newDate;
}