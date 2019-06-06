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
export const value = ([first, second]) => {
    let value = ''.concat(COLORS.indexOf(first), COLORS.indexOf(second));
    return Number(value);
};
