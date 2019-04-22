export const gigasecond = (bornTime) => {
  const bornTimeSecond = bornTime.getTime();
  const lifeTime = (10 ** 9) * 1000;
  const dieTimeSecond = bornTimeSecond + lifeTime;
  return new Date(dieTimeSecond);
};
