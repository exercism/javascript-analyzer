// We use the map instead of using the array, for two reasons:
// - It is easier to extend/modify the values of the map instead of manipulating the position of the array item
// - map.get works in constant time, while array.indexOf has linear complexity
const colorMap = new Map([
    ["black", 0],
    ["brown", 1],
    ["red", 2],
    ["orange", 3],
    ["yellow", 4],
    ["green", 5],
    ["blue", 6],
    ["violet", 7],
    ["grey", 8],
    ["white", 9],
]);

export const decodedValue = colorPair => {
    const [firstColor, secondColor] = colorPair;
    return 10 * colorMap.get(firstColor.toLowerCase()) + colorMap.get(secondColor.toLowerCase());
}
