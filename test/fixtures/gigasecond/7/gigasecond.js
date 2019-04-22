export const gigasecond = function (input) {
  return new Date(Date.parse(input) + 1000000000000);
}