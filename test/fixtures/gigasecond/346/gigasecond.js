export const gigasecond = (dateInput) => {
  const giga = Math.pow(10, 9);
  const dateInMs = dateInput.getTime();
  const dateInSeconds = dateInMs / 1000;
  const totalDateSeconds = (dateInSeconds + giga) * 1000;
return new Date(totalDateSeconds);
}
