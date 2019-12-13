export const COLORS = ['black','brown','red','orange','yellow','green','blue','violet','grey','white'];

export const decodedValue = colors => {

  return parseInt(colors.reduce((acc, color) => {
    return acc + COLORS.indexOf(color.toLowerCase());
  }, ''));

};
