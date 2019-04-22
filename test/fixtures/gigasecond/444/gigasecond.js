const Gigasecond = {
  milliseconds: (10 ** 9) * 1000,
};


export function gigasecond(birthday) {
  return new Date(birthday.getTime() + Gigasecond.milliseconds);
}
