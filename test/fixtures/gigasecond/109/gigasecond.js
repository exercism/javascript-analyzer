

function gigasecond(d) {

    return new Date(d.setTime(d.getTime() +1000000000000));

}
module.exports = {gigasecond};
