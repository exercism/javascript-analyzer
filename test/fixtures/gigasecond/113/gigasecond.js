var gigDate = Math.pow(10, 12);

function Gigasecond(dateIn) {
  this.dateIn = dateIn
};

Gigasecond.prototype.date = function(){
  return new Date(this.dateIn.getTime() + gigDate);
};

module.exports = Gigasecond;
