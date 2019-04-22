export const gigasecond = (x) => {
  x.setSeconds(x.getSeconds() + 1000000000);
  return x;
}
