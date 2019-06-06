export const value = (bands) => {
    var colors = ['black', 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'grey', 'white'];
    var value = 0;

    value += colors.indexOf(bands[0]) * 10;
    value += colors.indexOf(bands[1]);

    return value;
};
