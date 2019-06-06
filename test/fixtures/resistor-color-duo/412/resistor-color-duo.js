export const value = arr => {
    const COLORS = ['black', 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'grey', 'white'];
    const indexVals = arr.map(color => COLORS.indexOf(color.toLowerCase()));
    const placeVals = indexVals.map((e, i, arr) => {
        let len = arr.length;
        let ex = (len-1)-i;
        let place = 10**ex;
        return e * place;
    });
    const sumVals = placeVals.reduce((acc, curr) => acc + curr);
    return sumVals
}

// **** ALTERNATE **** //
// it passes and is simpler, but less mathematical

// export const value = arr => {
//     const COLORS = ['black', 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'grey', 'white'];
//     const indexVals = arr.map(color => COLORS.indexOf(color.toLowerCase()));
//     return parseInt(indexVals.join(''));
// }