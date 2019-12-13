export const decodedValue = (values) => {
    return values.reduce((acc, curr, index, arr) => {
        return acc + (COLORS.indexOf(curr) * Math.pow(10, arr.length - 1 - index));
    },0);
};

export const COLORS = ['black', 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'grey', 'white'];
