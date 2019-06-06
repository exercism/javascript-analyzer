export const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];

export const value = (arr) => {
    return Number(arr.map((col) => {
        return COLORS.findIndex((i) => (i == col))
    }).join(""));
}