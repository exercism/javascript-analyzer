const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];

export const decodedValue = (colorArray) => {
    let inputColorIndex = null;
    let colorIndex = null;
    let retval = '';
    for(inputColorIndex in colorArray) {
        for(colorIndex in COLORS) {
            if(COLORS[colorIndex] === colorArray[inputColorIndex])
                retval += colorIndex;
        }
    }
    return Number(retval);
};
