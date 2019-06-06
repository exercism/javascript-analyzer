export const value = (colorsArray = []) => {
    return +colorsArray.reduce((prev, next) => {
        return prev + COLORS.indexOf(next);
    }, '');
};

export const COLORS = [
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