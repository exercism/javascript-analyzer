export const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];

export const colorCode = (color) => {
    let number = 0;
    let f = null;
    for (f in COLORS) {
        if(COLORS[f] === color) return number;
        number++;
    }
};
