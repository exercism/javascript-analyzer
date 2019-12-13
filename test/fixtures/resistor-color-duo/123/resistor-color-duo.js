export const COLORS = ['black','brown','red','orange','yellow','green','blue','violet','grey','white'];
export const decodedValue = (colors, list = COLORS) => parseInt(colors.map(color => list.indexOf(color).toString()).join(''));
