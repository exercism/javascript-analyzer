function gigasecond(date){
var d = date;
d.setSeconds(d.getSeconds()+1000000000);
  return d.toUTCString();
}
