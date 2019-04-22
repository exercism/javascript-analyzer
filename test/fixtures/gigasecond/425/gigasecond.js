export  function gigasecond(date) {
    return new Date(date.getTime() + Math.pow(10,9)*1000 );

}
