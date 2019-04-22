export const gigasecond = function(givenDate){
  const givenDateMl = givenDate.getTime();
  const gigaMilisecond = Math.pow(10,9) * 1000;
  return new Date(givenDateMl + gigaMilisecond);
}
