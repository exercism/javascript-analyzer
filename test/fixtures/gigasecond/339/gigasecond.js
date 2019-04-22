function gigasecond(time){
    time.setSeconds( time.getSeconds() + 1000000000 );
    return time;
}

Date.prototype.addDays = function(days) {
    date.setDate(date.getDate() + days);
    return date;   
}

var oldGoodTimes = new Date(1910, 9, 11);
var actualDate = new Date();
console.log(actualDate.getTime() - oldGoodTimes.getTime());


module.exports = {
    gigasecond: gigasecond 
}