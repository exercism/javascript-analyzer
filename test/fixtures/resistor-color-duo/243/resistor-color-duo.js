export const ALL_COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];

export function value([color_one, color_two]) {
    const foo = ALL_COLORS.indexOf(color_one).toString() +  ALL_COLORS.indexOf(color_two).toString();
    return new Number(foo);
}
