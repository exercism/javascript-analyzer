export const colorCode = color => COLORS.indexOf(color);

export const COLORS = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"];

export const decodedValue = (colors) => {
  const firstColor = colorCode(colors[0]);
  const secondColor = colorCode(colors[1]);

  return (firstColor * 10) + secondColor;
}
