export const COLORS = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"]

export const colorCode = color => {
  if (COLORS.includes(color)) {
    return COLORS.indexOf(color)
  }
}