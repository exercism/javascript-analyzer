export const COLORS = ['black','brown','red','orange','yellow','green','blue','violet','grey','white'];
export const value = (color) => {
    return COLORS.indexOf(color[0].toLowerCase()) * 10 + COLORS.indexOf(color[1].toLowerCase());
};
