const COLORS = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"];
export const value = (colors) => {
  let response = colors.map(color => {
    return `${COLORS.indexOf(color)}`
  });
  return parseInt(response.join(''));
}