const COLORS = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"];

function colorCode(colorName) {
  return COLORS.reduce((accumulator, currentValue, currentIndex, array) => {
    return (currentValue == colorName) ? currentIndex : accumulator;
  }, undefined);
}

export { colorCode, COLORS };