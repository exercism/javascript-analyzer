export const gigasecond = currentAge => {
  const currentMilliseconds = Date.parse(currentAge);
  const millisecondsToAdd = Math.pow(10, 9) * 1000;

  return new Date(currentMilliseconds + millisecondsToAdd);
};
