
const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];

export const decodedValue = (values) => {
    let total = '';
    for (const val of values) {
        total += COLORS.indexOf(val);
    }
    return parseInt(total);
};
