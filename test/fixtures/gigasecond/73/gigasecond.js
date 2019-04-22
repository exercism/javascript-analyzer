export const gigasecond = (time) => {
  const newDate = time.getTime() + 1000000000000;
  return new Date(newDate);
};
