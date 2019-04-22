function gigasecond(date) {
    let dateInMilliseconds = date.getTime();
    let gigaseconds = 1000 * 1000 * 1000;
    return new Date(dateInMilliseconds + gigaseconds * 1000);
}

module.exports = {gigasecond}