const GIGASEC_TO_MILISEC = 1e+12; // gigasecond to miliseconds
export const gigasecond = (newDate) => {
  const GET_DATE_IN_MS = newDate.getTime(); // newDate to miliseconds
  return (new Date(GET_DATE_IN_MS + GIGASEC_TO_MILISEC));
};
