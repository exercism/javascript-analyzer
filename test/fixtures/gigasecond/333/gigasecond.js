export const gigasecond = (birthday) => {
  const birthTime = birthday.getTime();
  const gigsec = 1e12;
  return new Date(birthTime + gigsec);
}