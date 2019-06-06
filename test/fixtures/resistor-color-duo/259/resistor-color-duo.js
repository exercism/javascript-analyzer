const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];

export const value = (stringArr, array=COLORS) => {
    let string_code = '';

    stringArr.forEach((color) => {
        array.forEach((item, index) => {
            if (color == item) {
                string_code = string_code + index; 
            }   
        });
    });

    return parseInt(string_code, 10);
};