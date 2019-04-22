export const gigasecond = ( DandT ) => {
    var msec = DandT.getTime();
    
    var resultDate = new Date();
    resultDate.setTime(msec + 1e12);
    return resultDate;
}