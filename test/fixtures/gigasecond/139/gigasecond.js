export const gigasecond = (dt) => {
  const gs = new Date(dt).getTime() + 10**12; 
  return new Date(gs);
}
