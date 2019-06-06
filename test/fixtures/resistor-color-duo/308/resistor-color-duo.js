export const value = (arr) => {
    const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];
    const half = COLORS.indexOf(arr[0]);
    const half2 = COLORS.indexOf(arr[1]);
    return Number(half.toString() + half2.toString());
};