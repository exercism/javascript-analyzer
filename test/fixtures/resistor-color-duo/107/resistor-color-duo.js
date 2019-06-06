const COLORS = ['black', 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'grey', 'white']

export const value = (color_array) => {
    var result = [];
    // in case of unkonwn input array size we could have used a for loop...
    result[0] = COLORS.indexOf(color_array[0]);
    result[1] = COLORS.indexOf(color_array[1]);
    return Number.parseInt(result.join(''));
}