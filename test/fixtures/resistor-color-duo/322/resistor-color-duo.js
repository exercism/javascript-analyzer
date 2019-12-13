const COLORS = [
    'black',
    'brown',
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'violet',
    'grey',
    'white'
];
export const decodedValue = ([first, second]) => {
    let decodedValue = ''.concat(COLORS.indexOf(first), COLORS.indexOf(second));
    return Number(decodedValue);
};
