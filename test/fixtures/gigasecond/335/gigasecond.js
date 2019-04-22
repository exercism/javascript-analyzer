exports.gigasecond = function(time) {
    var giga = 1000000000;
    var seconds = time.getTime() / 1000;
    return new Date((seconds + giga) * 1000);
}