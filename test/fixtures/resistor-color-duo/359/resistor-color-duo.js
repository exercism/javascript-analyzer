export const decodedValue = (ColorArray) => {
    var COLORS = [
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

    return (COLORS.indexOf(ColorArray[0])*10
    + COLORS.indexOf(ColorArray[1]));
}
