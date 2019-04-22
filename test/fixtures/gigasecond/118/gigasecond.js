export const gigasecond = (birthday) => {
  if (birthday instanceof Date) {
    const billionDate = (birthday.getTime() + (1000000000 * 1000));
    return new Date(billionDate);
  }
  return 'Not a valid date.';
};
