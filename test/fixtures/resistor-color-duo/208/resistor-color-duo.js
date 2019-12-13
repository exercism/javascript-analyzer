var COLORS = [];
COLORS[0] = 'black';
COLORS[1] = 'brown';
COLORS[2] = 'red';
COLORS[3] = 'orange';
COLORS[4] = 'yellow';
COLORS[5] = 'green';
COLORS[6] = 'blue';
COLORS[7] = 'violet';
COLORS[8] = 'grey';
COLORS[9] = 'white';

export const decodedValue = (colorArray) => {

    return parseInt(COLORS.indexOf(colorArray[0]).toString() + COLORS.indexOf(colorArray[1]).toString());
}
