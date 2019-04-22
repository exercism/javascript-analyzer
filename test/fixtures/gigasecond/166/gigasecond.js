const GIGASECOND_IN_MILLIS = (10**9) * (10**3);
export const gigasecond = (giga) => {
  const birthdayTime = giga.getTime();
  return new Date(birthdayTime + GIGASECOND_IN_MILLIS);  
};
