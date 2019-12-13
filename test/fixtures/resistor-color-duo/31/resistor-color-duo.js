export const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];
export const decodedValue = (color) => {
    let result = ''
    for (let i = 0; i< color.length; i++){
        result += `${COLORS.indexOf(color[i])}`;
    }
    return Number(result);
};
