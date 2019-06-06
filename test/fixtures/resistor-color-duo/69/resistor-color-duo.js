const COLORS = {
  Black: 0,
  Brown: 1,
  Red: 2,
  Orange: 3,
  Yellow: 4,
  Green: 5,
  Blue: 6,
  Violet: 7,
  Grey: 8,
  White: 9
};

const capitalizeFirstLetter = string =>
  string.slice(0, 1).toUpperCase() + string.slice(1).toLowerCase();

export const value = colors => {
  return Number(
    colors.reduce((resistanceValue, color) => {
      const colorValue = COLORS[capitalizeFirstLetter(color)];

      if (colorValue === undefined) {
        throw new Error(`${color} is not a valid color`);
      }

      return resistanceValue + colorValue;
    }, "")
  );
};

// Shorter version
// Does not work if there are ever more than 2 colors
// Does not handle case where an invalid color is passed in
// export const value = colors => {
//   return Number(
//     `${COLORS[capitalizeFirstLetter(colors[0])]}${
//       COLORS[capitalizeFirstLetter(colors[1])]
//     }`
//   );
// };
