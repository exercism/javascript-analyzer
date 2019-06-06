const COLORS = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"];
const colorCode = (value) => {
  return COLORS.indexOf(value);
}

export { colorCode, COLORS };