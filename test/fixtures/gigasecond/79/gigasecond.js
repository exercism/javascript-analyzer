export function gigasecond(time){
    var date1 = new Date(time);
    var time1 = date1.getTime();// gets time in milliseconds since 1970
    var time2 = time1 + 1000000000000;// adds a gigasecond to the time

    return new Date(time2);// returns date based on time in ms passed since 1970

}