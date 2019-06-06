export const colorCode = (string, array=COLORS) => {
    let code = 0;

    array.forEach((item, index) => {
        if (item === string) {
            code = index;
        }
    });

    return code;
};

export const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];