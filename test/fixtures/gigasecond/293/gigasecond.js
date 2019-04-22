export const gigasecond = (gs) => {
  const gigasecondSum = new Date(gs.getTime() + 1000e+9);
  return gigasecondSum;
};
