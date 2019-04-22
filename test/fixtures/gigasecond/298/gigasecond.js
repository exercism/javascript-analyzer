function gigasecond(date){
  date.setSeconds(date.getSeconds() +  Math.pow(10, 9));
  return date;
}

export { gigasecond }
