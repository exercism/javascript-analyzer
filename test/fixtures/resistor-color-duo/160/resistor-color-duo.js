const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];
const colorCode = x => COLORS.indexOf(x);

export const value = resistors => 10*colorCode(resistors[0]) + colorCode(resistors[1]);
