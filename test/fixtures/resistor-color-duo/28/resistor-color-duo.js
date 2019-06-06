const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"]

export const value = (colorArr) => colorArr.reduce((acc,cur) => acc*10+COLORS.indexOf(cur), 0);
