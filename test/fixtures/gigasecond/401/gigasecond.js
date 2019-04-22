export const gigasecond = date => {
  const ms = date.getTime();
  return new Date((ms / 1000000000000 + 1) * 1000000000000);
}
