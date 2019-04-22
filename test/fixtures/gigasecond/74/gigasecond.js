export const gigasecond = (N) => {
   var d = N
   var d_s = N.getTime()
   d.setTime(d_s + 1000000000000)
   return d;
}