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
    'white',
];

export const decodedValue = colors => parseInt(colors.map(color => COLORS.indexOf(color)).join(''), 10);
