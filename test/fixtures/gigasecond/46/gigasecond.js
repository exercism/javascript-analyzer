var GIGASECOND = Math.pow(10, 12)


export const gigasecond = (day) => {
   return new Date(day.getTime() + GIGASECOND);
  };
  