var gigaS = Math.pow(10, 9);
export function gigasecond(sec) {
  var min = sec;
  var heure = min * 60;
  var day = heure * 24;
  var yearS = day * 365;
  var livedP = gigaS / yearS;
  return livedP;
}

var func = gigasecond(60);

console.log(func);
