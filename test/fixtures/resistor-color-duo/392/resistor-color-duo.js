export const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];
export const COLOR_CODES = new Map(COLORS.map((color, index) => [color,index] ));

export function value(colors) {
    return parseInt(`${COLOR_CODES.get(colors[0])}${COLOR_CODES.get(colors[1])}`);
}