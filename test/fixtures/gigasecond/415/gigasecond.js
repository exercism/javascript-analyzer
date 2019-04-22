export function gigasecond(date){
  const millisecond = Date.parse(date);
  return new Date(millisecond+1000000000000);
}