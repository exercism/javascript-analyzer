export const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];

export const colorCode = (value) => {
    return COLORS.findIndex(color => color===value);
};
