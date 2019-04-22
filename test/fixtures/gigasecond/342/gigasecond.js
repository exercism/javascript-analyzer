export const gigasecond = (birthday) => {
  const gigaMil = 1000000000000;
  const birthtime = new Date(birthday);
  const gigaTime = birthtime.getTime();
  return new Date(gigaTime + gigaMil);
};

