export const COLORS = ['black','brown','red','orange','yellow','green','blue','violet','grey','white']
export const colorCode = (color, list = COLORS ) => list.indexOf(color) > -1 ? list.indexOf(color) : null;
