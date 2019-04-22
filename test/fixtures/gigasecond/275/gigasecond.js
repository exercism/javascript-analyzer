export const gigasecond = (date)=>{
  //getTime() returns the number of milliseconds since 1970/01/01:
  return new Date(date.getTime() + Math.pow(10, 9 + 3));
}