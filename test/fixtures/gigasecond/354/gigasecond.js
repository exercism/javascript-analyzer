export const gigasecond = (date) => {
    //
    // YOUR CODE GOES HERE
    //
    return new Date((Date.parse(date) /1000 + Math.pow(10, 9)) * 1000);
};
  