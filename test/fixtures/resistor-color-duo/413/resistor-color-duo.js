const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];

export const decodedValue = ([col1 , col2]) => {
    let color1 = col1.toLowerCase();
    let color2 = col2.toLowerCase();

    const band1 = COLORS.indexOf(color1);
    const band2 = COLORS.indexOf(color2);

    const result = `${band1}${band2}`;
    return parseInt(result);
}
