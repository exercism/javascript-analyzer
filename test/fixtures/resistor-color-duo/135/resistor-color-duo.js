export const value = colorArray => {
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
  return parseInt(
    colorArray
      .map(color => COLORS[color])
      .filter(number => typeof number === "number")
      .join("")
  );
};
