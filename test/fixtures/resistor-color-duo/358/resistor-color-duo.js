const COLORS = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"];

const colorCode = color => {
  return COLORS.indexOf(color.toLowerCase());
};

const value = (colorString) => {
  const color1 = colorString.split(' ')[0].toLowerCase();
  const color2 = colorString.split(' ')[2].toLowerCase();
  const value1 = colorCode(color1);
  const value2 = colorCode(color2);
  return parseInt('' + value1 + value2)
};
