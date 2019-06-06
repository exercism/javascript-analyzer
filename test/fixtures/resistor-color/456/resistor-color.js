const COLORS = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"];

function colorCode(colorName) {
  const resistorColor = colorName.toLowerCase();

  if (!COLORS.includes(resistorColor)) {
    throw new Error(`Color ${resistorColor} is not a valid resistor color`);
  }

  return COLORS.findIndex(color => color === resistorColor);
}

export { colorCode, COLORS };
