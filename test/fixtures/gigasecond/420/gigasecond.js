export function gigasecond(date){
  var formatDate = new Date(date)
  var addSeconds = formatDate.setUTCSeconds(1000000000)
  return new Date(addSeconds)
}
