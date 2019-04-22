function getDate(d) {
  return {
    year: d.getUTCFullYear(),
    month: d.getUTCMonth(),
    day: d.getUTCDate(),
    hr: d.getUTCHours(),
    min: d.getUTCMinutes(),
    sec: d.getUTCSeconds(),
  };
}

export const gigasecond = (date) => {
  const {
    year: y, month: mo, day: d, hr: h = 0, min: m = 0, sec: s = 0,
  } = getDate(date);

  const ms = Date.UTC(y, mo, d, h, m, s) + 1000000000000;

  const {
    year: yN, month: moN, day: dN, hr: hN = 0, min: mN = 0, sec: sN = 0,
  } = getDate(new Date(ms));

  return new Date(Date.UTC(yN, moN, dN, hN, mN, sN));
};
