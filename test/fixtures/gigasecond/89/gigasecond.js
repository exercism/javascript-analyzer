export const gigasecond = (dateToEvaluate) => {
  const dateNum = new Date(dateToEvaluate).getTime();
  const newDate = new Date(dateNum + 1000000000000);
  return newDate;
}