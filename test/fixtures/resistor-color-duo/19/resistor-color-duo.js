const COLORS = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"];
export const decodedValue = (colors) => {
  let response = colors.map(color => {
    return `${COLORS.indexOf(color)}`
  });
  return parseInt(response.join(''));
}
