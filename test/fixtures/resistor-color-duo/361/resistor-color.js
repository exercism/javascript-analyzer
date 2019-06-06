export const COLORS = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"];

export const colorCode = (colorName) => {
  const resistorColor = colorName.toLowerCase();
  const resistorValue = COLORS.indexOf(resistorColor);

  if (resistorValue === -1) {
    throw new Error(`Color ${resistorColor} is not a valid resistor color`);
  }

  return resistorValue;
}
