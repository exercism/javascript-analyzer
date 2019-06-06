const map = color => {
  return { black: 0, brown: 1, red: 2, orange: 3, yellow: 4,
    green: 5, blue: 6, violet: 7, grey: 8, white: 9 }[color];
};
const value = ([ ten, unit ]) => +`${map(ten)}${map(unit)}`;

export { value, map }
