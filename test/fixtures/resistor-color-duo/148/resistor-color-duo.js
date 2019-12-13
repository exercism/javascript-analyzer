export const decodedValue = colors => {
    return colors.reduce((duo, color) => {
        return duo * 10 + [
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
        ].indexOf(color);
    }, 0);
};
