const colors = {
  'black': 0,
  'brown': 1,
  'red': 2,
  'orange': 3,
  'yellow': 4,
  'green': 5,
  'blue': 6,
  'violet': 7,
  'grey': 8,
  'white': 9,
};

export const value = (bandColors) => bandColors.reduce((total, color, i) =>
  total += colors[color] * 10 ** (Object.keys(bandColors).length - i - 1), 0);
