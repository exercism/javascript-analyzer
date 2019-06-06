const colors = [
    'Black',
    'Brown',
    'Red',
    'Orange',
    'Yellow',
    'Green',
    'Blue',
    'Violet',
    'Grey',
    'White'
];

export const COLORS = colors.map(color => color.toLowerCase())

export const colorCode = findColor => {
    let result;

    colors.map((color, i) => {
        if(color.toLowerCase() === findColor.toLowerCase()){
           return result = i;
        }
    })

    return result;
}