export const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"]

export const colorCode = (color) => {
    return COLORS.findIndex(col => (col == color));
};