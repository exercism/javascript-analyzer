export const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];

export const value = (colors) => {
    let values = colors.map(color => COLORS.indexOf(color));
    return values[0]*10+values[1];
};