export const gigasecond = (date) =>{
    var gigasecondInMs = Math.pow(10,12);
    var dateInMs = date.getTime();
    return new Date(dateInMs + gigasecondInMs);
}