export const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];

export const decodedValue = (arr) => {
    return Number(arr.map((col) => {
        return COLORS.findIndex((i) => (i == col))
    }).join(""));
}
