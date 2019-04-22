const gigaSec = 1000000000;
const getUTCDiff = pDate => Date.UTC(
  pDate.getUTCFullYear(),
  pDate.getUTCMonth(),
  pDate.getUTCDate(),
  pDate.getUTCHours(),
  pDate.getUTCMinutes(),
  pDate.getUTCSeconds(),
);

export const gigasecond = pDate => new Date(((((getUTCDiff(pDate) / 1000) + gigaSec) * 1000)));
