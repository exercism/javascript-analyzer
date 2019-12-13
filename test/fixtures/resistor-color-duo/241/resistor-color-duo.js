export const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];

export const decodedValue = (color) => parseInt(color.map(num => { return COLORS.indexOf(num) ;}).join(''));
