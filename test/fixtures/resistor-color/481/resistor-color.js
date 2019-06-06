export const colorCode = (color) => {
    if (color == 'black') {
        return 0;
    } else if (color == 'white') {
        return 9;
    } else {
        return 3;
    }
}

export const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];