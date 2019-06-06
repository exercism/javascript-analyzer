export { value };

const value = colors => {
  const COLORS = {
    black: 0,
    brown: 1,
    red: 2,
    orange: 3,
    yellow: 4,
    green: 5,
    blue: 6,
    violet: 7,
    grey: 8,
    white: 9
  };
  let c1 = COLORS[colors[0].toLowerCase()];
  let c2 = COLORS[colors[1].toLowerCase()];
  return parseInt(`${c1}` + `${c2}`);
};

console.log(value(["Brown", "Black"]));
