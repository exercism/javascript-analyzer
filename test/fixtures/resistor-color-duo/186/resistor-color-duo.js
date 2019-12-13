const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];

export const decodedValue = bands => Number.parseInt('' + COLORS.indexOf(bands[0]) + COLORS.indexOf(bands[1]));
