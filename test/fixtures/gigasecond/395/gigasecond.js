class Gigasecond {

  constructor (date) {
    this.date = date.getTime() 
  }

  Date() {
    return new Date(this.date+1e12);
  }
}


module.exports = {
  Gigasecond: Gigasecond,
};
