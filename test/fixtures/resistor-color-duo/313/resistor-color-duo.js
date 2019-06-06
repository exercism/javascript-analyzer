
// IN arr, OUT num
// 

export const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];

export const value = arr => +(COLORS.indexOf(arr[0]).toString() + COLORS.indexOf(arr[1]).toString());