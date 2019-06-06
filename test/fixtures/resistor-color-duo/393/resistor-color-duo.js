export const COLORS = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"];

// returns -1 if color isn't found
export const colorCode = (name) => COLORS.indexOf(name);

export const value = (arr) => {
    let code1 = colorCode(arr[0]);
    let code2 = colorCode(arr[1]);

    if(code1 !== -1 && code2 !== -1) 
        return code1 * 10 + code2;
    else return undefined;
}