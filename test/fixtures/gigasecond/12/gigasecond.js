export const gigasecond = (dat) => {
  const billms = 1000000000000;	
  let dateToMS = dat.getTime();
  let newDate = dateToMS + billms;
  return new Date(newDate);
}
