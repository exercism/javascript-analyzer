const oneTera = 1000000000000;
  
const futureDate = (presentDate) => {
    return new Date(presentDate + oneTera);
}

export const gigasecond = (date) => {
    const start = date.getTime();
    const result = futureDate(start);
    return result;
}
