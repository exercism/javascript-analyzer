const COLORS = ['black', 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'grey', 'white'];

export const value = (colors = []) => {
  let colorValue = '';
  colors.forEach(color => colorValue += COLORS.indexOf(color));
  return Number(colorValue);
};