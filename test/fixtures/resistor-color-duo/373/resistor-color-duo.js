const COLORS = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"]

export const decodedValue = (colorArray) => {
  return Number(`${COLORS.indexOf(colorArray[0])}${COLORS.indexOf(colorArray[1])}`);
}
