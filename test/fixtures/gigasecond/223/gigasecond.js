export const gigasecond = (time) => {
  const timestamp = Math.trunc(time.getTime() / 1000) + 1e9;
  return (new Date(timestamp * 1000));
};
