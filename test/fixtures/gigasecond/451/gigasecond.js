export function gigasecond(timeObject){
    var milliSec = timeObject.getTime();
    var gigaSecAn = new Date(milliSec+1000000000000);
    return gigaSecAn;
}