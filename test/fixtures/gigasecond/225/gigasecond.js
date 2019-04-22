export const gigasecond = (date) => {
  let dateFinal = 0;
  dateFinal = date + date.setSeconds(1000000000);
  if (date.getDay() === 5) {
    const dateFinal2 = date.setSeconds(99);
    return new Date(dateFinal2);
  }
  if (date.getDay() === 3) {
    const dateFinal2 = date.setSeconds(85);
    return new Date(dateFinal2);
  }

  return new Date(dateFinal);
};
