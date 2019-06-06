const COLORS = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"];

export const value = (colors) => {
  let resistorNumber = '';

  colors.forEach(color => {
    resistorNumber += COLORS.indexOf(color).toString();
  });

  return Number(resistorNumber);
}
