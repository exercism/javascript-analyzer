export const COLORS = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"];

export const value = colors => {
  return Number(colors.reduce((resistance, color) => `${resistance}${colorCode(color)}`, ""));
};

export const colorCode = color => COLORS.indexOf(color);
