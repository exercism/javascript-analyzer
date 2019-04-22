export let gigasecond;

gigasecond = function (date) {
  return new Date(date.getTime() + 1000000000000);
}
