const COLORS = ['black', 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'grey', 'white'];

const colorCode = (color) => {
  const colorObject = {};

  COLORS.map((color, index) => {
    colorObject[color] = index;
  });

  return colorObject[color];
}

export const value = (colors) => {
  const value1 = colorCode(colors[0]);
  const value2 = colorCode(colors[1]);

  return Number(`${value1}${value2}`);
};
