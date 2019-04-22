export const gigasecond = dateFrom => {
  return new Date((dateFrom.getTime() / 1000 + 1000000000) * 1000);
};
