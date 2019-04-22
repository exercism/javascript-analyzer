const gigaseconds = 10 ** 9;

export const gigasecond = (birthdate) => {
  const birthdateMilliseconds = birthdate.getTime();
  const birthdateSeconds = birthdateMilliseconds / 1000;
  const secondsAfterGigasecondElapses = birthdateSeconds + gigaseconds;
  const millisecondsAfterGigasecondElapses = secondsAfterGigasecondElapses * 1000;
  return new Date(millisecondsAfterGigasecondElapses);
};
