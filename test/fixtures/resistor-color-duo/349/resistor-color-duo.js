const COLORS = ['black','brown','red','orange','yellow','green','blue','violet','grey','white'];
export const value = ([value1, value2]) => {
    return COLORS.indexOf(value1) * 10 + COLORS.indexOf(value2);
};