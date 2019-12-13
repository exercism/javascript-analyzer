const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];

export const decodedValue = (colorPair) => COLORS.indexOf(colorPair[0])*10 + COLORS.indexOf(colorPair[1]);
