export const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];
export const COLOR_CODES = new Map(COLORS.map((color, index) => [color,index] ));

export function colorCode(color) {
    return COLOR_CODES.get(color);
}