 export const COLORS = {
    black: 0,
    brown: 1,
    red: 2,
    orange: 3,
    yellow: 4,
    green: 5,
    blue: 6,
    violet: 7,
    grey: 8,
    white: 9
};

export const colorCode = (arr) => { 
     // no tsure its possible to concat two numbers without converting them to a string and then changing back to a num
     let newArray = arr.map(arrValue => String(COLORS[arrValue]));
     let joinedArray = parseFloat(newArray.join(''));
     return joinedArray;
}
    