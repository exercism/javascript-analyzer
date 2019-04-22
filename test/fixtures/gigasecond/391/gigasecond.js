export const gigasecond = (date)=>{
    var seconds = date.getTime()/1000;
    var result = new Date((seconds+10**9)*1000)
    return result;
}