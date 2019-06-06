const color_map = new Map([
    ["black", 0],
    ["brown", 1],
    ["red", 2],
    ["orange", 3],
    ["yellow", 4],
    ["green", 5],
    ["blue", 6],
    ["violet", 7],
    ["grey", 8],
    ["white", 9]
]);

export const colorCode = (color) => {
    return color_map.get(color.toLowerCase());
}

export const value = (code) => {
    return colorCode(code[0])*10 + colorCode(code[1]);
}

