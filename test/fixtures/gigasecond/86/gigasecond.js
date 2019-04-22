export const gigasecond = () => {
  // Sam Li


  // version #1 - start here
  function gigasecond01 (bday) {
    var s = new Date(bday).getTime()/1000; // convert bday to epoch value
    var live = Math.pow(10,9) + s; // 
    var d = new Date(0);
    return d.setUTCSeconds(live);
  }
};
