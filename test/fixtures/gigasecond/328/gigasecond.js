export const gigasecond = (dt) => {
    const gigSec = 10 ** 12
  return new Date(dt.valueOf() + gigSec)
};
