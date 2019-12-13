const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"]

export const decodedValue = (colorArr) => colorArr.reduce((acc,cur) => acc*10+COLORS.indexOf(cur), 0);
