// Calculate the moment when someone has lived for 10^9 seconds.

export const gigasecond = (gs) => {
  const d = gs;
  d.setSeconds(d.getSeconds() + 1000000000);
  return d;
};