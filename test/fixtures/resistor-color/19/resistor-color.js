export const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];
export const colorCode = (color = "") => {
    return Number(Object.keys(COLORS).find(key => COLORS[key] === color));
}