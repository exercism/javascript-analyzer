export const gigasecond = (date) => {
  console.log(date);
  let sec = date.getTime();
  let sum = sec += Math.pow(10,12);
    return new Date(sum)
};
