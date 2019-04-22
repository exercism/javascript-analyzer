export const gigasecond = (input) => {
  const gigasecondInMicro = 1e9 * 1e3;
  const inputMicroSeconds = input.getTime();
  const newMicroSeconds = inputMicroSeconds + gigasecondInMicro;
  return new Date(newMicroSeconds);
};
