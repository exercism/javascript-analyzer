export const gigasecond = (date) => {
  const result = date + date.setSeconds(1000000000);
  return result.toString();
}

// const date = new Date(Date.UTC(2015, 8, 14));

// console.log(gigasecond(date));

