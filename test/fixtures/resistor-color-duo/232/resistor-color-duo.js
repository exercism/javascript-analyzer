export function decodedValue([color1, color2]) {
    const bandColors = ['black', 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'grey', 'white']
    let index1 = bandColors.indexOf(color1);
    let index2 = bandColors.indexOf(color2);
    return Number([index1, index2].join(''));
}
