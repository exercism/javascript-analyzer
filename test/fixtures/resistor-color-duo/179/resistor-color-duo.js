export const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];

export const decodedValue = (colors) => {
    const reducer = (accumulator, currentValue) => accumulator + COLORS.findIndex(color => color === currentValue);
    return parseInt(colors.reduce(reducer, ''));
};
