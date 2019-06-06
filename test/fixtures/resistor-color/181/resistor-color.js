export const COLORS = ['black','brown','red','orange','yellow','green','blue','violet','grey','white'];

export const colorCode = (c) => {
    return COLORS.findIndex(color => c === color);
};

