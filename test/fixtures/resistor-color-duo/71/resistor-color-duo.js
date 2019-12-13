export const decodedValue = (bands) => {
    var colors = ['black', 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'grey', 'white'];
    var decodedValue = 0;

    decodedValue += colors.indexOf(bands[0]) * 10;
    decodedValue += colors.indexOf(bands[1]);

    return decodedValue;
};
